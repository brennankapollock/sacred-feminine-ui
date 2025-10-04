import { client } from "@/src/sanity";
import RetreatCheckout from "@/src/components/RetreatCheckout";

const hasSanityConfig = Boolean(
  (process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || process.env.SANITY_PROJECT_ID) &&
  (process.env.NEXT_PUBLIC_SANITY_DATASET || process.env.SANITY_DATASET)
);

export default function RetreatCheckoutPage({ retreatData }) {
  return <RetreatCheckout retreatData={retreatData} />;
}

export const getStaticPaths = async () => {
  if (!hasSanityConfig) {
    return { paths: [], fallback: "blocking" };
  }

  const query = `*[_type == "retreat" && isLodgingCheckoutActive == true]{
    "slug": slug.current
  }`;

  const retreats = await client.fetch(query);

  const paths = retreats.map((retreat) => ({
    params: { retreatSlug: retreat.slug },
  }));

  return {
    paths,
    fallback: "blocking",
  };
};

export const getStaticProps = async ({ params }) => {
  if (!hasSanityConfig) {
    return { notFound: true, revalidate: 60 };
  }

  const query = `*[_type == "retreat" && slug.current == $slug && isLodgingCheckoutActive == true][0]{
    name,
    "slug": slug.current,
    accessCode,
    price,
    checkoutDescription,
    paymentOptions[] | order(displayOrder asc) {
      name,
      type,
      price,
      description,
      isActive,
      displayOrder
    },
    lodgingOptions[]-> {
      _id,
      name,
      description,
      type,
      price,
      image,
      displayOrder,
      isActive
    },
    cardImage,
    range,
    startDate,
    endDate,
    location,
    detailsOne,
    detailsTwo
  }`;

  const retreatData = await client.fetch(query, { slug: params.retreatSlug });

  if (!retreatData) {
    return {
      notFound: true,
      revalidate: 60,
    };
  }

  // Filter only active payment options and sort by display order
  if (retreatData.paymentOptions) {
    retreatData.paymentOptions = retreatData.paymentOptions
      .filter(option => option.isActive)
      .sort((a, b) => (a.displayOrder || 0) - (b.displayOrder || 0));
  }

  // Filter only active lodging options and sort by display order
  if (retreatData.lodgingOptions) {
    retreatData.lodgingOptions = retreatData.lodgingOptions
      .filter(option => option.isActive)
      .sort((a, b) => a.displayOrder - b.displayOrder);
  }

  return {
    props: {
      retreatData,
    },
    revalidate: 60, // Revalidate every minute
  };
};

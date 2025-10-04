import { client } from "@/src/sanity";
import DynamicCheckoutPage from "@/src/components/DynamicCheckoutPage";

const hasSanityConfig = Boolean(
  (process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || process.env.SANITY_PROJECT_ID) &&
  (process.env.NEXT_PUBLIC_SANITY_DATASET || process.env.SANITY_DATASET)
);

export default function CheckoutPage({ checkoutData }) {
  return <DynamicCheckoutPage checkoutData={checkoutData} />;
}

export const getStaticPaths = async () => {
  // If Sanity is not configured in this environment, skip pre-generating paths
  if (!hasSanityConfig) {
    return { paths: [], fallback: "blocking" };
  }

  const query = `*[_type == "checkoutPage" && isActive == true]{
    "slug": slug.current
  }`;

  const checkoutPages = await client.fetch(query);

  const paths = checkoutPages.map((page) => ({
    params: { slug: page.slug },
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

  const query = `*[_type == "checkoutPage" && slug.current == $slug][0]{
    title,
    "slug": slug.current,
    retreatName,
    description,
    isActive,
    colorScheme,
    headerImage,
    paymentOptions[] | order(displayOrder asc) {
      name,
      type,
      price,
      description,
      isActive,
      displayOrder
    },
    accessCode,
    accessTitle,
    accessDescription,
    contactEmail
  }`;

  const checkoutData = await client.fetch(query, { slug: params.slug });

  if (!checkoutData || !checkoutData.isActive) {
    return {
      notFound: true,
      revalidate: 60,
    };
  }

  return {
    props: {
      checkoutData,
    },
    revalidate: 60, // Revalidate every minute
  };
};

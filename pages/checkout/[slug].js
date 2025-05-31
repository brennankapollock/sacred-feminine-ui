import { client } from "@/src/sanity";
import DynamicCheckoutPage from "@/src/components/DynamicCheckoutPage";
import { GetStaticPaths, GetStaticProps } from "next";

export default function CheckoutPage({ checkoutData }) {
  return <DynamicCheckoutPage checkoutData={checkoutData} />;
}

export const getStaticPaths = async () => {
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
    };
  }

  return {
    props: {
      checkoutData,
    },
    revalidate: 60, // Revalidate every minute
  };
};

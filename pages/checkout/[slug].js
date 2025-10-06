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

  const [checkoutPages, events] = await Promise.all([
    client.fetch(`*[_type == "checkoutPage" && isActive == true]{ "slug": slug.current }`),
    client.fetch(`*[_type == "event" && coalesce(isCheckoutActive, true) == true && coalesce(enableTicketButton, true) == true]{
      "slug": slug.current
    }`),
  ]);

  const paths = [...checkoutPages, ...events]
    .filter((item) => item?.slug)
    .map((item) => ({
      params: { slug: item.slug },
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

  if (checkoutData && checkoutData.isActive) {
    return {
      props: {
        checkoutData,
      },
      revalidate: 60,
    };
  }

  const eventQuery = `*[_type == "event" && slug.current == $slug][0]{
    name,
    "slug": slug.current,
    checkoutDescription,
    contactEmail,
    paymentOptions[] | order(displayOrder asc) {
      name,
      type,
      price,
      description,
      isActive,
      displayOrder
    },
    price,
    isCheckoutActive,
  }`;

  const eventData = await client.fetch(eventQuery, { slug: params.slug });

  if (!eventData) {
    return {
      notFound: true,
      revalidate: 60,
    };
  }

  const activePaymentOptions = (eventData.paymentOptions || [])
    .filter((option) => option?.isActive)
    .map((option, index) => ({
      ...option,
      displayOrder: option.displayOrder || index + 1,
    }));

  if (activePaymentOptions.length === 0 || eventData.isCheckoutActive === false) {
    return {
      notFound: true,
      revalidate: 60,
    };
  }

  const adaptedCheckout = {
    title: eventData.name,
    slug: params.slug,
    retreatName: eventData.name,
    description: eventData.checkoutDescription,
    isActive: true,
    colorScheme: null,
    paymentOptions: activePaymentOptions,
    contactEmail: eventData.contactEmail || 'team@sacredfeminine.co',
  };

  return {
    props: {
      checkoutData: adaptedCheckout,
    },
    revalidate: 60,
  };
};

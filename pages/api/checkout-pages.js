import { client } from "@/src/sanity";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    const query = `*[_type == "checkoutPage" && isActive == true] | order(_createdAt desc) {
      title,
      "slug": slug.current,
      retreatName,
      description,
      isActive,
      colorScheme,
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
      contactEmail,
      _createdAt,
      _updatedAt
    }`;

    const checkoutPages = await client.fetch(query);

    res.status(200).json({
      success: true,
      data: checkoutPages,
      count: checkoutPages.length,
    });
  } catch (error) {
    console.error("Error fetching checkout pages:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching checkout pages",
      error: error.message,
    });
  }
}

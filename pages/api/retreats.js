import { client } from "@/src/sanity";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    const query = `*[_type == "retreat"] | order(_createdAt desc) {
      _id,
      name,
      "slug": slug.current,
      range,
      location,
      price,
      accessCode,
      isLodgingCheckoutActive,
      lodgingOptions[]-> {
        _id,
        name,
        type,
        price,
        isActive
      },
      paymentOptions[] {
        name,
        type,
        price,
        isActive
      },
      _createdAt,
      _updatedAt
    }`;

    const retreats = await client.fetch(query);

    res.status(200).json({
      success: true,
      data: retreats,
    });
  } catch (error) {
    console.error("Error fetching retreats:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch retreats",
      error: error.message,
    });
  }
}
import { client } from "@/src/sanity";

export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      const query = `*[_type == "lodgingOption" && isActive == true] | order(displayOrder asc) {
        _id,
        name,
        description,
        price,
        type,
        "image": image.asset->url,
        isActive,
        displayOrder,
        _createdAt,
        _updatedAt
      }`;

      const lodgingOptions = await client.fetch(query);

      res.status(200).json({
        success: true,
        data: lodgingOptions,
        count: lodgingOptions.length,
      });
    } catch (error) {
      console.error("Error fetching lodging options:", error);
      res.status(500).json({
        success: false,
        message: "Error fetching lodging options",
        error: error.message,
      });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}

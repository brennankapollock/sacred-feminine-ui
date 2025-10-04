import { getSecret } from "../../lib/secrets";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    res.setHeader("Allow", "GET");
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  try {
    // Fetch public configuration values from Doppler
    const stripePublishableKey = await getSecret('STRIPE_PUBLISHABLE_KEY');
    
    const config = {
      stripePublishableKey,
      // Add other public config values here as needed
    };

    res.status(200).json({ success: true, config });
  } catch (error) {
    console.error("Failed to fetch configuration:", error.message);
    res.status(500).json({ 
      success: false, 
      error: "Failed to fetch configuration",
      details: error.message 
    });
  }
}
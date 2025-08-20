require("dotenv").config();
import Stripe from "stripe";

// Check if Stripe key is available
if (!process.env.STRIPE_SECRET_KEY) {
  console.error("STRIPE_SECRET_KEY is not set in environment variables");
}

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2023-10-16",
});

export default async function handler(req, res) {
  console.log("API Route called with method:", req.method);
  console.log("Request headers:", req.headers);

  if (req.method !== "POST") {
    console.log("Method not allowed:", req.method);
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  try {
    const { cartItems, returnUrl } = req.body;

    console.log("Received cart items:", cartItems);
    console.log("Return URL:", returnUrl);

    if (!cartItems || !Array.isArray(cartItems) || cartItems.length === 0) {
      return res.status(400).json({ error: "Invalid cart items" });
    }

    // Map cart items to the Stripe line_items format
    const line_items = cartItems.map((item) => {
      return {
        price_data: {
          currency: "usd",
          product_data: {
            name: item.name,
            images: item.image ? [item.image] : [],
          },
          unit_amount: Math.round(item.price * 100), // Convert to cents and ensure it's an integer
        },
        quantity: item.quantity || 1,
      };
    });

    console.log("Creating Stripe session with line items:", line_items);

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items,
      mode: "payment",
      success_url: `${req.headers.origin}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: returnUrl || `${req.headers.origin}`,
    });

    console.log("Stripe session created:", session.id);
    res.status(200).json({ sessionId: session.id });
  } catch (error) {
    console.error("Error creating checkout session:", error);
    res.status(500).json({
      error: "Failed to create checkout session",
      details: error.message,
    });
  }
}

require("dotenv").config();
import Stripe from "stripe";
import { getSecret } from "../../../lib/secrets";

// Initialize Stripe with Doppler secret
let stripe;

async function initializeStripe() {
  if (!stripe) {
    try {
      const stripeSecretKey = await getSecret('STRIPE_SECRET_KEY');
      if (!stripeSecretKey) {
        throw new Error("STRIPE_SECRET_KEY not found in Doppler");
      }
      stripe = new Stripe(stripeSecretKey, {
        apiVersion: "2023-10-16",
      });
    } catch (error) {
      console.error("Failed to initialize Stripe:", error.message);
      throw error;
    }
  }
  return stripe;
}

export default async function handler(req, res) {
  console.log("API Route called with method:", req.method);
  console.log("Request headers:", req.headers);

  if (req.method !== "POST") {
    console.log("Method not allowed:", req.method);
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  try {
    // Initialize Stripe with Doppler secret
    const stripeClient = await initializeStripe();
    
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

    const session = await stripeClient.checkout.sessions.create({
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

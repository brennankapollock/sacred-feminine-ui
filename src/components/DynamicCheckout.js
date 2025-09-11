import { loadStripe } from "@stripe/stripe-js";
import Head from "next/head";
import { useState } from "react";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY,
  {
    apiVersion: '2023-10-16',
    stripeAccount: undefined,
    // Disable analytics to prevent ad blocker issues
    betas: [],
    locale: 'auto',
  }
);

export default function DynamicCheckout({ checkoutData }) {
  const [selectedProduct, setSelectedProduct] = useState(null);

  if (!checkoutData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-600">Checkout page not found or inactive.</p>
      </div>
    );
  }

  const {
    title,
    retreatName,
    description,
    colorScheme,
    paymentOptions,
    contactEmail,
  } = checkoutData;

  // Sort payment options by display order
  const sortedPaymentOptions =
    paymentOptions
      ?.filter((option) => option.isActive)
      ?.sort((a, b) => (a.displayOrder || 0) - (b.displayOrder || 0)) || [];

  const handleProductSelect = (product) => {
    setSelectedProduct(product);
  };

  const handleCheckout = async () => {
    if (!selectedProduct) {
      alert("Please select a payment option to proceed.");
      return;
    }

    try {
      console.log("Starting checkout process...");
      console.log("Selected product:", selectedProduct);

      const stripe = await stripePromise;
      if (!stripe) {
        console.error("Stripe failed to load");
        alert("Payment system is not available. Please try again.");
        return;
      }

      const requestBody = {
        cartItems: [
          {
            id: selectedProduct.displayOrder,
            name: selectedProduct.name,
            price: selectedProduct.price,
            quantity: 1,
            type: selectedProduct.type,
          },
        ],
        returnUrl: window.location.origin,
      };

      console.log("Making API request to /api/checkout-sessions/create");
      console.log("Request body:", requestBody);

      const response = await fetch("/api/checkout-sessions/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });

      console.log("Response status:", response.status);
      console.log("Response headers:", response.headers);

      if (!response.ok) {
        const errorText = await response.text();
        console.error("API Error:", response.status, errorText);
        throw new Error(`API Error: ${response.status} - ${errorText}`);
      }

      const responseData = await response.json();
      console.log("API Response:", responseData);

      if (!responseData.sessionId) {
        throw new Error("No session ID received from API");
      }

      console.log("Redirecting to Stripe checkout...");
      const result = await stripe.redirectToCheckout({
        sessionId: responseData.sessionId,
      });

      if (result.error) {
        console.error("Stripe redirect error:", result.error);
        alert(`Payment error: ${result.error.message}`);
      }
    } catch (error) {
      console.error("Checkout error:", error);
      alert(
        `Checkout failed: ${error.message}. Please try again or contact support.`
      );
    }
  };

  // Generate CSS custom properties for colors
  const cssVars = colorScheme
    ? {
        "--primary-color": colorScheme.primary?.hex || "#4a5568",
        "--secondary-color": colorScheme.secondary?.hex || "#2d3748",
        "--text-color": colorScheme.text?.hex || "#2d3748",
        "--bg-from": colorScheme.background?.from?.hex || "#f0f2f5",
        "--bg-to": colorScheme.background?.to?.hex || "#e8ebf0",
      }
    : {};

  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <div
        className="min-h-screen py-12 px-4 sm:px-6 lg:px-8"
        style={{
          background: `linear-gradient(to bottom, var(--bg-from), var(--bg-to))`,
          ...cssVars,
        }}
      >
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            {description && (
              <p
                className="text-lg max-w-2xl mx-auto font-light"
                style={{ color: "var(--text-color)" }}
              >
                {description}
              </p>
            )}
          </div>

          {!selectedProduct ? (
            <div className="space-y-6">
              {sortedPaymentOptions.map((product, index) => (
                <div
                  key={index}
                  className="bg-white rounded-xl shadow-[0_4px_20px_rgba(0,0,0,0.08)] p-6 md:p-8 transition-transform duration-200 hover:scale-[1.02] border border-gray-200"
                >
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                    <div className="mb-4 md:mb-0">
                      <h2
                        className="font-bagnard text-2xl mb-2"
                        style={{ color: "var(--text-color)" }}
                      >
                        {product.name}
                      </h2>
                      <div className="inline-block bg-gray-50 px-3 py-1 rounded-full text-sm mb-3 border border-gray-200">
                        <span style={{ color: "var(--primary-color)" }}>
                          {product.type}
                        </span>
                      </div>
                      {product.description && (
                        <p className="text-sm text-gray-600 mt-2">
                          {product.description}
                        </p>
                      )}
                    </div>
                    <div className="flex flex-col items-start md:items-end space-y-3">
                      <p
                        className="text-2xl font-bagnard"
                        style={{ color: "var(--text-color)" }}
                      >
                        ${product.price}
                      </p>
                      <button
                        onClick={() => handleProductSelect(product)}
                        className="px-6 py-3 rounded-lg transition-all duration-200 font-bagnard text-xl tracking-wide shadow-sm w-full md:w-auto text-white"
                        style={{
                          background: `linear-gradient(to right, var(--primary-color), var(--secondary-color))`,
                        }}
                        onMouseOver={(e) => {
                          e.target.style.background = `linear-gradient(to right, var(--secondary-color), var(--primary-color))`;
                        }}
                        onMouseOut={(e) => {
                          e.target.style.background = `linear-gradient(to right, var(--primary-color), var(--secondary-color))`;
                        }}
                      >
                        Select Option
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-xl shadow-[0_4px_20px_rgba(0,0,0,0.08)] p-8 md:p-10 border border-gray-200">
              <h3
                className="font-bagnard text-2xl mb-6"
                style={{ color: "var(--text-color)" }}
              >
                Order Summary
              </h3>
              <div className="border-t border-b border-gray-200 py-6 mb-6">
                <div className="flex justify-between items-center mb-4">
                  <div>
                    <h4
                      className="font-bagnard text-xl mb-1"
                      style={{ color: "var(--text-color)" }}
                    >
                      {selectedProduct.name}
                    </h4>
                    <div className="inline-block bg-gray-50 px-3 py-1 rounded-full text-sm border border-gray-200">
                      <span style={{ color: "var(--primary-color)" }}>
                        {selectedProduct.type}
                      </span>
                    </div>
                    {selectedProduct.description && (
                      <p className="text-sm text-gray-600 mt-2">
                        {selectedProduct.description}
                      </p>
                    )}
                  </div>
                  <p
                    className="text-2xl font-bagnard"
                    style={{ color: "var(--text-color)" }}
                  >
                    ${selectedProduct.price}
                  </p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row justify-between gap-4">
                <button
                  onClick={() => handleProductSelect(null)}
                  className="px-6 py-3 border-2 rounded-lg transition-colors duration-200 font-bagnard text-xl"
                  style={{
                    borderColor: "var(--primary-color)",
                    color: "var(--primary-color)",
                  }}
                  onMouseOver={(e) => {
                    e.target.style.backgroundColor = "var(--bg-from)";
                  }}
                  onMouseOut={(e) => {
                    e.target.style.backgroundColor = "transparent";
                  }}
                >
                  Change Selection
                </button>
                <button
                  onClick={handleCheckout}
                  className="px-8 py-3 rounded-lg transition-all duration-200 transform hover:scale-[1.02] font-bagnard text-xl tracking-wide shadow-sm text-white"
                  style={{
                    background: `linear-gradient(to right, var(--primary-color), var(--secondary-color))`,
                  }}
                  onMouseOver={(e) => {
                    e.target.style.background = `linear-gradient(to right, var(--secondary-color), var(--primary-color))`;
                  }}
                  onMouseOut={(e) => {
                    e.target.style.background = `linear-gradient(to right, var(--primary-color), var(--secondary-color))`;
                  }}
                >
                  Proceed to Payment
                </button>
              </div>
            </div>
          )}

          <div className="text-center mt-8">
            <p className="text-sm" style={{ color: "var(--text-color)" }}>
              Need assistance? Contact{" "}
              <a
                href={`mailto:${contactEmail}`}
                className="underline hover:opacity-75"
                style={{ color: "var(--primary-color)" }}
              >
                {contactEmail}
              </a>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

import { loadStripe } from "@stripe/stripe-js";
import Head from "next/head";
import { useState } from "react";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
);

const products = [
  {
    id: 1,
    name: "Full Retreat Payment",
    price: 1200,
    image: "product1.jpg",
    quantity: 1,
    type: "Full Payment",
  },
  {
    id: 2,
    name: "Retreat Second Payment",
    price: 700,
    image: "product1.jpg",
    quantity: 1,
    type: "Second Payment",
  },
  {
    id: 3,
    name: "Retreat Deposit",
    price: 500,
    image: "product2.jpg",
    quantity: 1,
    type: "Deposit",
  },
];

export default function MensCheckout() {
  const [selectedProduct, setSelectedProduct] = useState(null);

  const handleProductSelect = (product) => {
    setSelectedProduct(product);
  };

  const handleCheckout = async () => {
    if (!selectedProduct) {
      alert("Please select a payment option to proceed.");
      return;
    }
    const stripe = await stripePromise;
    const response = await fetch("/api/checkout-sessions/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        cartItems: [selectedProduct],
        returnUrl: window.location.origin,
      }),
    });
    const { sessionId } = await response.json();
    await stripe.redirectToCheckout({ sessionId });
  };

  return (
    <>
      <Head>
        <title>Checkout | Sacred Masculine Retreat</title>
      </Head>
      <div className="min-h-screen bg-gradient-to-b from-[#f0f2f5] to-[#e8ebf0] py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-[#4a5568] text-lg max-w-2xl mx-auto font-light">
              Choose your payment option for the Sacred Feminine Mens Retreat
            </p>
          </div>

          {!selectedProduct ? (
            <div className="space-y-6">
              {products.map((product) => (
                <div
                  key={product.id}
                  className="bg-white rounded-xl shadow-[0_4px_20px_rgba(0,0,0,0.08)] p-6 md:p-8 transition-transform duration-200 hover:scale-[1.02] border border-[#e2e8f0]"
                >
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                    <div className="mb-4 md:mb-0">
                      <h2 className="font-cormorant text-2xl text-[#2d3748] mb-2">
                        {product.name}
                      </h2>
                      <div className="inline-block bg-[#f7fafc] px-3 py-1 rounded-full text-sm text-[#4a5568] mb-3 border border-[#e2e8f0]">
                        {product.type}
                      </div>
                    </div>
                    <div className="flex flex-col items-start md:items-end space-y-3">
                      <p className="text-2xl font-cormorant text-[#2d3748]">
                        ${product.price}
                      </p>
                      <button
                        onClick={() => handleProductSelect(product)}
                        className="bg-gradient-to-r from-[#4a5568] to-[#2d3748] hover:from-[#2d3748] hover:to-[#1a202c] text-white px-6 py-3 rounded-lg transition-all duration-200 font-cormorant text-xl tracking-wide shadow-sm w-full md:w-auto"
                      >
                        Select Option
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-xl shadow-[0_4px_20px_rgba(0,0,0,0.08)] p-8 md:p-10 border border-[#e2e8f0]">
              <h3 className="font-cormorant text-2xl text-[#2d3748] mb-6">
                Order Summary
              </h3>
              <div className="border-t border-b border-[#e2e8f0] py-6 mb-6">
                <div className="flex justify-between items-center mb-4">
                  <div>
                    <h4 className="font-cormorant text-xl text-[#2d3748] mb-1">
                      {selectedProduct.name}
                    </h4>
                    <div className="inline-block bg-[#f7fafc] px-3 py-1 rounded-full text-sm text-[#4a5568] border border-[#e2e8f0]">
                      {selectedProduct.type}
                    </div>
                  </div>
                  <p className="text-2xl font-cormorant text-[#2d3748]">
                    ${selectedProduct.price}
                  </p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row justify-between gap-4">
                <button
                  onClick={() => handleProductSelect(null)}
                  className="px-6 py-3 border-2 border-[#4a5568] text-[#4a5568] rounded-lg hover:bg-[#f7fafc] transition-colors duration-200 font-cormorant text-xl"
                >
                  Change Selection
                </button>
                <button
                  onClick={handleCheckout}
                  className="bg-gradient-to-r from-[#4a5568] to-[#2d3748] hover:from-[#2d3748] hover:to-[#1a202c] text-white px-8 py-3 rounded-lg transition-all duration-200 transform hover:scale-[1.02] font-cormorant text-xl tracking-wide shadow-sm"
                >
                  Proceed to Payment
                </button>
              </div>
            </div>
          )}

          <div className="text-center mt-8">
            <p className="text-sm text-[#4a5568]">
              Need assistance? Contact{" "}
              <a
                href="mailto:team@sacredfeminine.co"
                className="text-[#4a5568] hover:text-[#2d3748] underline"
              >
                team@sacredfeminine.co
              </a>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

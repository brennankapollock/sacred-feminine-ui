import { loadStripe } from "@stripe/stripe-js";
import Head from "next/head";
import { useState } from "react";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
);

const products = [
  {
    id: 1,
    name: "Sacred Feminine Retreat",
    price: 1150,
    image: "product1.jpg",
    quantity: 1,
    type: "Full Payment",
  },
  {
    id: 2,
    name: "Retreat Second Payment",
    price: 650,
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

export default function Checkout() {
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
        <title>Checkout | Sacred Feminine Retreat</title>
      </Head>
      <div className="min-h-screen bg-gradient-to-b from-desert_sand-900 to-desert_sand-800 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-eerie_black-600 text-lg max-w-2xl mx-auto font-light">
              Choose your payment option for the Sacred Feminine Retreat
            </p>
          </div>

          {!selectedProduct ? (
            <div className="space-y-6">
              {products.map((product) => (
                <div
                  key={product.id}
                  className="bg-white rounded-xl shadow-[0_4px_20px_rgba(0,0,0,0.08)] border border-desert_sand-300 p-6 md:p-8 transition-transform duration-200 hover:scale-[1.02]"
                >
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                    <div className="mb-4 md:mb-0">
                      <h2 className="font-bagnard text-2xl text-eerie_black mb-2">
                        {product.name}
                      </h2>
                      <div className="inline-block bg-desert_sand-900 px-3 py-1 rounded-full text-sm text-dark_goldenrod-400 border border-desert_sand-300 mb-3">
                        {product.type}
                      </div>
                    </div>
                    <div className="flex flex-col items-start md:items-end space-y-3">
                      <p className="text-2xl font-bagnard text-eerie_black">
                        ${product.price}
                      </p>
                      <button
                        onClick={() => handleProductSelect(product)}
                        className="bg-gradient-to-r from-dark_goldenrod to-dark_goldenrod-600 hover:from-dark_goldenrod-600 hover:to-dark_goldenrod-700 text-white px-6 py-3 rounded-lg transition-all duration-200 font-bagnard text-xl tracking-wide shadow-sm w-full md:w-auto"
                      >
                        Select Option
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-xl shadow-[0_4px_20px_rgba(0,0,0,0.08)] border border-desert_sand-300 p-8 md:p-10">
              <h3 className="font-bagnard text-2xl text-eerie_black mb-6">
                Order Summary
              </h3>
              <div className="border-t border-b border-desert_sand-300 py-6 mb-6">
                <div className="flex justify-between items-center mb-4">
                  <div>
                    <h4 className="font-bagnard text-xl text-eerie_black mb-1">
                      {selectedProduct.name}
                    </h4>
                    <div className="inline-block bg-desert_sand-900 px-3 py-1 rounded-full text-sm text-dark_goldenrod-400 border border-desert_sand-300">
                      {selectedProduct.type}
                    </div>
                  </div>
                  <p className="text-2xl font-bagnard text-eerie_black">
                    ${selectedProduct.price}
                  </p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row justify-between gap-4">
                <button
                  onClick={() => handleProductSelect(null)}
                  className="px-6 py-3 border-2 border-dark_goldenrod text-dark_goldenrod rounded-lg hover:bg-desert_sand-900 transition-colors duration-200 font-bagnard text-xl"
                >
                  Change Selection
                </button>
                <button
                  onClick={handleCheckout}
                  className="bg-gradient-to-r from-dark_goldenrod to-dark_goldenrod-600 hover:from-dark_goldenrod-600 hover:to-dark_goldenrod-700 text-white px-8 py-3 rounded-lg transition-all duration-200 transform hover:scale-[1.02] font-bagnard text-xl tracking-wide shadow-sm"
                >
                  Proceed to Payment
                </button>
              </div>
            </div>
          )}

          <div className="text-center mt-8">
            <p className="text-sm text-eerie_black-600">
              Need assistance? Contact{" "}
              <a
                href="mailto:team@sacredfeminine.co"
                className="text-[#b5a397] hover:text-dark_goldenrod-400 underline"
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

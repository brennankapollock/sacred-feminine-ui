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
      <div className="min-h-screen bg-gradient-to-b from-[#f8f3ef] to-[#f0e9e4] py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="font-cormorant text-4xl md:text-5xl text-[#2c2c2c] mb-4">
              Select Your Journey
            </h1>
            <p className="text-[#666666] text-lg max-w-2xl mx-auto font-light">
              Choose your payment option for the Sacred Feminine Retreat
            </p>
          </div>

          {!selectedProduct ? (
            <div className="space-y-6">
              {products.map((product) => (
                <div
                  key={product.id}
                  className="bg-white rounded-xl shadow-[0_4px_20px_rgba(0,0,0,0.05)] p-6 md:p-8 transition-transform duration-200 hover:scale-[1.02]"
                >
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                    <div className="mb-4 md:mb-0">
                      <h2 className="font-cormorant text-2xl text-[#2c2c2c] mb-2">
                        {product.name}
                      </h2>
                      <div className="inline-block bg-[#f8f3ef] px-3 py-1 rounded-full text-sm text-[#927f73] mb-3">
                        {product.type}
                      </div>
                    </div>
                    <div className="flex flex-col items-start md:items-end space-y-3">
                      <p className="text-2xl font-cormorant text-[#2c2c2c]">
                        ${product.price}
                      </p>
                      <button
                        onClick={() => handleProductSelect(product)}
                        className="bg-gradient-to-r from-[#b5a397] to-[#a39185] hover:from-[#a39185] hover:to-[#927f73] text-white px-6 py-3 rounded-lg transition-all duration-200 font-cormorant text-xl tracking-wide shadow-sm w-full md:w-auto"
                      >
                        Select Option
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-xl shadow-[0_4px_20px_rgba(0,0,0,0.05)] p-8 md:p-10">
              <h3 className="font-cormorant text-2xl text-[#2c2c2c] mb-6">
                Order Summary
              </h3>
              <div className="border-t border-b border-[#e5e5e5] py-6 mb-6">
                <div className="flex justify-between items-center mb-4">
                  <div>
                    <h4 className="font-cormorant text-xl text-[#2c2c2c] mb-1">
                      {selectedProduct.name}
                    </h4>
                    <div className="inline-block bg-[#f8f3ef] px-3 py-1 rounded-full text-sm text-[#927f73]">
                      {selectedProduct.type}
                    </div>
                  </div>
                  <p className="text-2xl font-cormorant text-[#2c2c2c]">
                    ${selectedProduct.price}
                  </p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row justify-between gap-4">
                <button
                  onClick={() => handleProductSelect(null)}
                  className="px-6 py-3 border-2 border-[#b5a397] text-[#b5a397] rounded-lg hover:bg-[#f8f3ef] transition-colors duration-200 font-cormorant text-xl"
                >
                  Change Selection
                </button>
                <button
                  onClick={handleCheckout}
                  className="bg-gradient-to-r from-[#b5a397] to-[#a39185] hover:from-[#a39185] hover:to-[#927f73] text-white px-8 py-3 rounded-lg transition-all duration-200 transform hover:scale-[1.02] font-cormorant text-xl tracking-wide shadow-sm"
                >
                  Proceed to Payment
                </button>
              </div>
            </div>
          )}

          <div className="text-center mt-8">
            <p className="text-sm text-[#666666]">
              Need assistance? Contact{" "}
              <a
                href="mailto:team@sacredfeminine.co"
                className="text-[#b5a397] hover:text-[#927f73] underline"
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

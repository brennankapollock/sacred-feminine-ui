import { loadStripe } from "@stripe/stripe-js";
import Head from "next/head";
import { useState, useEffect } from "react";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
);

export default function Lodging() {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchLodgingOptions();
  }, []);

  const fetchLodgingOptions = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/lodging-options");
      const result = await response.json();

      if (result.success) {
        // Convert the data format to match the existing structure
        const formattedProducts = result.data.map((option, index) => ({
          id: option._id,
          name: option.name,
          description: option.description,
          price: option.price,
          type: option.type,
          image: option.image || `product${index + 1}.jpg`,
          quantity: 1,
        }));
        setProducts(formattedProducts);
      } else {
        setError(result.message);
      }
    } catch (err) {
      setError("Failed to load lodging options");
      console.error("Error:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleProductSelect = (product) => {
    setSelectedProduct(product);
  };

  const handleCheckout = async () => {
    if (!selectedProduct) {
      alert("Please select a lodging option to proceed.");
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

  if (selectedProduct) {
    return (
      <>
        <Head>
          <title>Lodging Checkout | Sacred Feminine</title>
        </Head>
        <div className="min-h-screen bg-gradient-to-b from-desert_sand-900 to-desert_sand-800 py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-12">
              <h1 className="font-bagnard text-4xl md:text-5xl text-eerie_black mb-4">
                Lodging Checkout
              </h1>
              <p className="text-eerie_black-600 text-lg max-w-2xl mx-auto font-light">
                Review your selected accommodation
              </p>
            </div>

            <div className="bg-white rounded-xl shadow-[0_4px_20px_rgba(0,0,0,0.08)] border border-desert_sand-300 p-8 md:p-10">
              <h3 className="font-bagnard text-2xl text-eerie_black mb-6">
                Order Summary
              </h3>
              <div className="border-t border-b border-[#e5e5e5] py-6 mb-6">
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
                <p className="text-eerie_black-600 text-base">
                  {selectedProduct.description}
                </p>
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
                  className="bg-gradient-to-r from-dark_goldenrod to-dark_goldenrod-600 hover:from-dark_goldenrod-600 hover:to-dark_goldenrod-700 text-white px-8 py-3 rounded-lg transition-all duration-200 font-bagnard text-xl tracking-wide shadow-sm"
                >
                  Proceed to Payment
                </button>
              </div>
            </div>

            <div className="text-center mt-8">
              <p className="text-sm text-eerie_black-600">
                Need assistance? Contact{" "}
                <a
                  href="mailto:team@sacredfeminine.co"
                  className="text-dark_goldenrod hover:text-dark_goldenrod-400 underline"
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

  return (
    <>
      <Head>
        <title>Lodging Selection | Sacred Feminine</title>
      </Head>
      <div className="min-h-screen bg-gradient-to-b from-desert_sand-900 to-desert_sand-800 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="font-bagnard text-4xl md:text-5xl text-eerie_black mb-4">
              Select Your Accommodation
            </h1>
            <p className="text-eerie_black-600 text-lg max-w-2xl mx-auto font-light">
              Choose your preferred lodging option for the retreat
            </p>
          </div>

          {loading ? (
            <div className="text-center py-12">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-dark_goldenrod"></div>
              <p className="mt-4 text-eerie_black-600">Loading lodging options...</p>
            </div>
          ) : error ? (
            <div className="text-center py-12">
              <div className="bg-red-50 border border-red-200 rounded-lg p-6">
                <p className="text-red-600 mb-4">{error}</p>
                <button
                  onClick={fetchLodgingOptions}
                  className="bg-dark_goldenrod text-white px-4 py-2 rounded-lg hover:bg-dark_goldenrod-600 transition-colors"
                >
                  Try Again
                </button>
              </div>
            </div>
          ) : products.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-eerie_black-600 text-lg">No lodging options available at this time.</p>
              <p className="text-eerie_black-700 text-sm mt-2">Please contact us for assistance.</p>
            </div>
          ) : (
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
                      <p className="text-eerie_black-600 text-base">
                        {product.description}
                      </p>
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
          )}

          <div className="text-center mt-8">
            <p className="text-sm text-eerie_black-600">
              Need assistance? Contact{" "}
              <a
                href="mailto:team@sacredfeminine.co"
                className="text-dark_goldenrod hover:text-dark_goldenrod-400 underline"
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

import { loadStripe } from "@stripe/stripe-js";
import Head from "next/head";
import { useState } from "react";
import { getStripePublishableKey } from "../../lib/config";

let stripePromise = null;

async function getStripe() {
  if (!stripePromise) {
    try {
      const publishableKey = await getStripePublishableKey();
      stripePromise = loadStripe(publishableKey, {
        apiVersion: '2023-10-16',
        stripeAccount: undefined,
        betas: [],
        locale: 'auto',
      });
    } catch (error) {
      console.error('Failed to initialize Stripe:', error);
      throw error;
    }
  }
  return stripePromise;
}

export default function RetreatCheckout({ retreatData }) {
  const [code, setCode] = useState('');
  const [isCodeValid, setIsCodeValid] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedLodging, setSelectedLodging] = useState(null);

  const handleCodeSubmit = (e) => {
    e.preventDefault();
    if (code === retreatData.accessCode) {
      setIsCodeValid(true);
    } else {
      alert('Invalid code. Please try again.');
    }
  };

  const handleProductSelect = (product) => {
    setSelectedProduct(product);
  };

  const handleLodgingSelect = (lodging) => {
    setSelectedLodging(lodging);
  };

  const handleCheckout = async () => {
    if (!selectedProduct) {
      alert("Please select a payment option to proceed.");
      return;
    }

    try {
      console.log("Starting checkout process...");
      console.log("Selected product:", selectedProduct);
      console.log("Selected lodging:", selectedLodging);

      const stripe = await getStripe();
      if (!stripe) {
        console.error("Stripe failed to load");
        alert("Payment system is not available. Please try again.");
        return;
      }

      const cartItems = [
        {
          id: selectedProduct.displayOrder || 1,
          name: selectedProduct.name,
          price: selectedProduct.price,
          quantity: 1,
          type: selectedProduct.type,
        }
      ];

      // Add lodging if selected
      if (selectedLodging) {
        cartItems.push({
          id: `lodging-${selectedLodging._id}`,
          name: selectedLodging.name,
          price: selectedLodging.price,
          quantity: 1,
          type: selectedLodging.type,
        });
      }

      const requestBody = {
        cartItems,
        returnUrl: window.location.origin,
        retreatInfo: {
          name: retreatData.name,
          slug: retreatData.slug,
        }
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

  // Calculate total price
  const totalPrice = (selectedProduct?.price || 0) + (selectedLodging?.price || 0);

  if (!isCodeValid) {
    return (
      <>
        <Head>
          <title>{retreatData.name} - Checkout | Sacred Feminine</title>
        </Head>
        <div className="min-h-screen bg-gradient-to-b from-desert_sand-900 to-desert_sand-800 flex flex-col items-center justify-center p-6">
          <div className="w-full max-w-lg">
            <div className="text-center mb-12">
              <h1 className="font-bagnard text-4xl md:text-5xl text-eerie_black mb-4">
                {retreatData.name}
              </h1>
              <h2 className="font-bagnard text-2xl text-eerie_black mb-4">
                Retreat Checkout
              </h2>
              <p className="text-eerie_black-600 text-lg max-w-md mx-auto font-light">
                Enter your registration code to proceed with checkout
              </p>
            </div>

            <div className="bg-white rounded-xl shadow-[0_4px_20px_rgba(0,0,0,0.08)] p-8 md:p-10 border border-desert_sand-300">
              <form onSubmit={handleCodeSubmit} className="space-y-8">
                <div className="space-y-2">
                  <label
                    htmlFor="code"
                    className="block text-sm font-medium text-eerie_black-600 mb-2"
                  >
                    Registration Code
                  </label>
                  <div className="relative">
                    <input
                      id="code"
                      type="text"
                      value={code}
                      onChange={(e) => setCode(e.target.value.toUpperCase())}
                      placeholder="Enter your code"
                      className="w-full px-4 py-4 rounded-lg border-2 border-desert_sand-300 focus:outline-none focus:border-dark_goldenrod text-eerie_black placeholder-eerie_black-600 text-lg transition-colors duration-200"
                      required
                    />
                  </div>
                  <p className="text-sm text-eerie_black-700 mt-2">
                    This code was provided in your registration confirmation
                  </p>
                </div>

                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-dark_goldenrod to-dark_goldenrod-600 hover:from-dark_goldenrod-600 hover:to-dark_goldenrod-700 text-white py-4 px-6 rounded-lg transition-all duration-200 transform hover:scale-[1.02] font-bagnard text-xl tracking-wide shadow-sm"
                >
                  Proceed to Checkout
                </button>
              </form>
            </div>

            <div className="text-center mt-8">
              <p className="text-sm text-eerie_black-600">
                Need assistance? Contact{" "}
                <a
                  href="mailto:team@sacredfeminine.co"
                  className="text-eerie_black-600 hover:text-eerie_black underline"
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
        <title>{retreatData.name} - Checkout | Sacred Feminine</title>
      </Head>
      <div className="min-h-screen bg-gradient-to-b from-desert_sand-900 to-desert_sand-800 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="font-bagnard text-4xl md:text-5xl text-eerie_black mb-4">
              {retreatData.name}
            </h1>
            <h2 className="font-bagnard text-2xl text-eerie_black mb-4">
              Checkout
            </h2>
            {retreatData.checkoutDescription && (
              <p className="text-eerie_black-600 text-lg max-w-2xl mx-auto font-light">
                {retreatData.checkoutDescription}
              </p>
            )}
            {retreatData.range && (
              <p className="text-eerie_black-600 text-base mt-4">
                {retreatData.range} • {retreatData.location}
              </p>
            )}
          </div>

          {!selectedProduct ? (
            <div>
              {/* Payment Options Section */}
              <div className="mb-8">
                <h3 className="font-bagnard text-2xl text-eerie_black mb-6">
                  Select Payment Option
                </h3>
                <div className="space-y-6">
                  {retreatData.paymentOptions?.map((product, index) => (
                    <div
                      key={index}
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
                          {product.description && (
                            <p className="text-eerie_black-600 text-base">
                              {product.description}
                            </p>
                          )}
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
              </div>

              {/* Optional Lodging Section */}
              {retreatData.lodgingOptions && retreatData.lodgingOptions.length > 0 && (
                <div>
                  <h3 className="font-bagnard text-2xl text-eerie_black mb-6">
                    Add Lodging (Optional)
                  </h3>
                  <div className="space-y-6">
                    {retreatData.lodgingOptions.map((lodging) => (
                      <div
                        key={lodging._id}
                        className={`bg-white rounded-xl shadow-[0_4px_20px_rgba(0,0,0,0.08)] border p-6 md:p-8 transition-all duration-200 hover:scale-[1.02] ${
                          selectedLodging?._id === lodging._id
                            ? 'border-dark_goldenrod-400 ring-2 ring-dark_goldenrod-200'
                            : 'border-desert_sand-300'
                        }`}
                      >
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                          <div className="mb-4 md:mb-0">
                            <h2 className="font-bagnard text-2xl text-eerie_black mb-2">
                              {lodging.name}
                            </h2>
                            <div className="inline-block bg-desert_sand-900 px-3 py-1 rounded-full text-sm text-dark_goldenrod-400 border border-desert_sand-300 mb-3">
                              {lodging.type}
                            </div>
                            <p className="text-eerie_black-600 text-base">
                              {lodging.description}
                            </p>
                          </div>
                          <div className="flex flex-col items-start md:items-end space-y-3">
                            <p className="text-2xl font-bagnard text-eerie_black">
                              ${lodging.price}
                            </p>
                            <button
                              onClick={() => handleLodgingSelect(
                                selectedLodging?._id === lodging._id ? null : lodging
                              )}
                              className={`px-6 py-3 rounded-lg transition-all duration-200 font-bagnard text-xl tracking-wide shadow-sm w-full md:w-auto ${
                                selectedLodging?._id === lodging._id
                                  ? 'bg-gradient-to-r from-green-500 to-green-600 text-white'
                                  : 'bg-gradient-to-r from-dark_goldenrod to-dark_goldenrod-600 hover:from-dark_goldenrod-600 hover:to-dark_goldenrod-700 text-white'
                              }`}
                            >
                              {selectedLodging?._id === lodging._id ? 'Selected' : 'Add Lodging'}
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="bg-white rounded-xl shadow-[0_4px_20px_rgba(0,0,0,0.08)] border border-desert_sand-300 p-8 md:p-10">
              <h3 className="font-bagnard text-2xl text-eerie_black mb-6">
                Order Summary
              </h3>

              <div className="border-t border-b border-desert_sand-300 py-6 mb-6 space-y-4">
                {/* Retreat Payment */}
                <div className="flex justify-between items-center">
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

                {/* Lodging if selected */}
                {selectedLodging && (
                  <div className="flex justify-between items-center pt-4 border-t border-desert_sand-200">
                    <div>
                      <h4 className="font-bagnard text-xl text-eerie_black mb-1">
                        {selectedLodging.name}
                      </h4>
                      <div className="inline-block bg-desert_sand-900 px-3 py-1 rounded-full text-sm text-dark_goldenrod-400 border border-desert_sand-300">
                        {selectedLodging.type}
                      </div>
                    </div>
                    <p className="text-2xl font-bagnard text-eerie_black">
                      ${selectedLodging.price}
                    </p>
                  </div>
                )}

                {/* Total */}
                <div className="flex justify-between items-center pt-4 border-t border-desert_sand-300">
                  <h4 className="font-bagnard text-xl text-eerie_black">
                    Total
                  </h4>
                  <p className="text-3xl font-bagnard text-eerie_black">
                    ${totalPrice}
                  </p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row justify-between gap-4">
                <button
                  onClick={() => {
                    setSelectedProduct(null);
                    setSelectedLodging(null);
                  }}
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
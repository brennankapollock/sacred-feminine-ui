import { loadStripe } from "@stripe/stripe-js";
import Head from "next/head";
import { useState } from "react";
import { getStripePublishableKey } from "../../lib/config";

let stripePromise = null;

async function getStripe() {
  if (!stripePromise) {
    try {
      const publishableKey = await getStripePublishableKey();
      stripePromise = loadStripe(publishableKey);
    } catch (error) {
      console.error('Failed to initialize Stripe:', error);
      throw error;
    }
  }
  return stripePromise;
}

export default function RetreatLodging({ retreatData }) {
  const [code, setCode] = useState('');
  const [isCodeValid, setIsCodeValid] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const handleCodeSubmit = (e) => {
    e.preventDefault();
    if (code === retreatData.accessCode) {
      setIsCodeValid(true);
    } else {
      alert('Invalid code. Please try again.');
    }
  };

  const handleProductSelect = (lodgingOption) => {
    const product = {
      id: lodgingOption._id,
      name: lodgingOption.name,
      description: lodgingOption.description,
      price: lodgingOption.price,
      type: lodgingOption.type,
      quantity: 1,
    };
    setSelectedProduct(product);
  };

  const handleCheckout = async () => {
    if (!selectedProduct) {
      alert("Please select a lodging option to proceed.");
      return;
    }
    const stripe = await getStripe();
    const response = await fetch("/api/checkout-sessions/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        cartItems: [selectedProduct],
        returnUrl: window.location.origin,
        retreatInfo: {
          name: retreatData.name,
          slug: retreatData.slug,
        }
      }),
    });
    const { sessionId } = await response.json();
    await stripe.redirectToCheckout({ sessionId });
  };

  if (!isCodeValid) {
    return (
      <>
        <Head>
          <title>{retreatData.name} - Lodging | Sacred Feminine</title>
        </Head>
        <div className="min-h-screen bg-gradient-to-b from-desert_sand-900 to-desert_sand-800 flex flex-col items-center justify-center p-6">
          <div className="w-full max-w-lg">
            <div className="text-center mb-12">
              <h1 className="font-bagnard text-4xl md:text-5xl text-eerie_black mb-4">
                {retreatData.name}
              </h1>
              <h2 className="font-bagnard text-2xl text-eerie_black mb-4">
                Lodging Information
              </h2>
              <p className="text-eerie_black-600 text-lg max-w-md mx-auto font-light">
                Enter your access code to view retreat lodging details
              </p>
            </div>

            <div className="bg-white rounded-xl shadow-[0_4px_20px_rgba(0,0,0,0.08)] p-8 md:p-10 border border-desert_sand-300">
              <form onSubmit={handleCodeSubmit} className="space-y-8">
                <div className="space-y-2">
                  <label
                    htmlFor="code"
                    className="block text-sm font-medium text-dark_goldenrod-400 mb-2"
                  >
                    Access Code
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
                    This code was provided in your retreat welcome package
                  </p>
                </div>

                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-dark_goldenrod to-dark_goldenrod-600 hover:from-dark_goldenrod-600 hover:to-dark_goldenrod-700 text-white py-4 px-6 rounded-lg transition-all duration-200 transform hover:scale-[1.02] font-bagnard text-xl tracking-wide shadow-sm"
                >
                  View Lodging Details
                </button>
              </form>
            </div>

            <div className="text-center mt-8">
              <p className="text-sm text-eerie_black-600">
                Need assistance? Contact{' '}
                <a
                  href="mailto:team@sacredfeminine.co"
                  className="text-dark_goldenrod hover:text-dark_goldenrod-600 underline"
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

  if (selectedProduct) {
    return (
      <>
        <Head>
          <title>{retreatData.name} - Lodging Checkout | Sacred Feminine</title>
        </Head>
        <div className="min-h-screen bg-gradient-to-b from-desert_sand-900 to-desert_sand-800 py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-12">
              <h1 className="font-bagnard text-4xl md:text-5xl text-eerie_black mb-4">
                {retreatData.name}
              </h1>
              <h2 className="font-bagnard text-2xl text-eerie_black mb-4">
                Lodging Checkout
              </h2>
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
                  onClick={() => setSelectedProduct(null)}
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
        <title>{retreatData.name} - Select Lodging | Sacred Feminine</title>
      </Head>
      <div className="min-h-screen bg-gradient-to-b from-desert_sand-900 to-desert_sand-800 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="font-bagnard text-4xl md:text-5xl text-eerie_black mb-4">
              {retreatData.name}
            </h1>
            <h2 className="font-bagnard text-2xl text-eerie_black mb-4">
              Select Your Accommodation
            </h2>
            <p className="text-eerie_black-600 text-lg max-w-2xl mx-auto font-light">
              Choose your preferred lodging option for the retreat
            </p>
            {retreatData.range && (
              <p className="text-eerie_black-600 text-base mt-4">
                {retreatData.range} • {retreatData.location}
              </p>
            )}
          </div>

          {!retreatData.lodgingOptions || retreatData.lodgingOptions.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-eerie_black-600 text-lg">No lodging options available for this retreat.</p>
              <p className="text-eerie_black-700 text-sm mt-2">Please contact us for assistance.</p>
            </div>
          ) : (
            <div className="space-y-6">
              {retreatData.lodgingOptions.map((lodgingOption) => (
                <div
                  key={lodgingOption._id}
                  className="bg-white rounded-xl shadow-[0_4px_20px_rgba(0,0,0,0.08)] border border-desert_sand-300 p-6 md:p-8 transition-transform duration-200 hover:scale-[1.02]"
                >
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                    <div className="mb-4 md:mb-0">
                      <h2 className="font-bagnard text-2xl text-eerie_black mb-2">
                        {lodgingOption.name}
                      </h2>
                      <div className="inline-block bg-desert_sand-900 px-3 py-1 rounded-full text-sm text-dark_goldenrod-400 border border-desert_sand-300 mb-3">
                        {lodgingOption.type}
                      </div>
                      <p className="text-eerie_black-600 text-base">
                        {lodgingOption.description}
                      </p>
                    </div>
                    <div className="flex flex-col items-start md:items-end space-y-3">
                      <p className="text-2xl font-bagnard text-eerie_black">
                        ${lodgingOption.price}
                      </p>
                      <button
                        onClick={() => handleProductSelect(lodgingOption)}
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
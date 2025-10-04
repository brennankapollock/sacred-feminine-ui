import MensCheckout from "@/src/components/MensCheckout";
import Head from "next/head";
import { useState } from "react";

const MensCheckoutPage = () => {
  const [code, setCode] = useState("");
  const [isCodeValid, setIsCodeValid] = useState(false);
  const validCode = "MENSRETREAT2025";

  const handleCodeSubmit = (e) => {
    e.preventDefault();
    if (code === validCode) {
      setIsCodeValid(true);
    } else {
      alert("Invalid code. Please try again.");
    }
  };

  if (isCodeValid) {
    return <MensCheckout />;
  }

  return (
    <>
      <Head>
        <title>Men's Retreat Checkout | Sacred Masculine</title>
      </Head>
      <div className="min-h-screen bg-gradient-to-b from-desert_sand-900 to-desert_sand-800 flex flex-col items-center justify-center p-6">
        <div className="w-full max-w-lg">
          <div className="text-center mb-12">
            <h1 className="font-bagnard text-4xl md:text-5xl text-eerie_black mb-4">
              Men's Retreat Checkout
            </h1>
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
};

export default MensCheckoutPage;

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
      <div className="min-h-screen bg-gradient-to-b from-[#f0f2f5] to-[#e8ebf0] flex flex-col items-center justify-center p-6">
        <div className="w-full max-w-lg">
          <div className="text-center mb-12">
            <h1 className="font-cormorant text-4xl md:text-5xl text-[#2d3748] mb-4">
              Men's Retreat Checkout
            </h1>
            <p className="text-[#4a5568] text-lg max-w-md mx-auto font-light">
              Enter your registration code to proceed with checkout
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-[0_4px_20px_rgba(0,0,0,0.08)] p-8 md:p-10 border border-[#e2e8f0]">
            <form onSubmit={handleCodeSubmit} className="space-y-8">
              <div className="space-y-2">
                <label
                  htmlFor="code"
                  className="block text-sm font-medium text-[#4a5568] mb-2"
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
                    className="w-full px-4 py-4 rounded-lg border-2 border-[#e2e8f0] focus:outline-none focus:border-[#4a5568] text-[#2d3748] placeholder-[#a0aec0] text-lg transition-colors duration-200"
                    required
                  />
                </div>
                <p className="text-sm text-[#718096] mt-2">
                  This code was provided in your registration confirmation
                </p>
              </div>

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-[#4a5568] to-[#2d3748] hover:from-[#2d3748] hover:to-[#1a202c] text-white py-4 px-6 rounded-lg transition-all duration-200 transform hover:scale-[1.02] font-cormorant text-xl tracking-wide shadow-sm"
              >
                Proceed to Checkout
              </button>
            </form>
          </div>

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
};

export default MensCheckoutPage;

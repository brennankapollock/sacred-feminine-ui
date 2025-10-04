import Head from "next/head";
import { useState } from "react";
import DynamicCheckout from "./DynamicCheckout";

const DynamicCheckoutPage = ({ checkoutData }) => {
  const [code, setCode] = useState("");
  const [isCodeValid, setIsCodeValid] = useState(false);

  if (!checkoutData || !checkoutData.isActive) {
    return (
      <>
        <Head>
          <title>Page Not Found</title>
        </Head>
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-800 mb-4">
              Checkout Page Not Available
            </h1>
            <p className="text-gray-600">
              This checkout page is either inactive or does not exist.
            </p>
          </div>
        </div>
      </>
    );
  }

  const {
    title,
    accessCode,
    accessTitle,
    accessDescription,
    colorScheme,
    contactEmail,
  } = checkoutData;

  const handleCodeSubmit = (e) => {
    e.preventDefault();
    if (code === accessCode) {
      setIsCodeValid(true);
    } else {
      alert("Invalid code. Please try again.");
    }
  };

  if (isCodeValid) {
    return <DynamicCheckout checkoutData={checkoutData} />;
  }

  // Generate CSS custom properties for colors
  const cssVars = colorScheme
    ? {
        "--primary-color": colorScheme.primary?.hex || "#A98747",
        "--secondary-color": colorScheme.secondary?.hex || "#876c39",
        "--text-color": colorScheme.text?.hex || "#1A1A1A",
        "--bg-from": colorScheme.background?.from?.hex || "#faf1eb",
        "--bg-to": colorScheme.background?.to?.hex || "#f4e2d7",
      }
    : {};

  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <div
        className="min-h-screen flex flex-col items-center justify-center p-6"
        style={{
          background: `linear-gradient(to bottom, var(--bg-from), var(--bg-to))`,
          ...cssVars,
        }}
      >
        <div className="w-full max-w-lg">
          <div className="text-center mb-12">
            <h1
              className="font-bagnard text-4xl md:text-5xl mb-4"
              style={{ color: "var(--text-color)" }}
            >
              {accessTitle}
            </h1>
            <p
              className="text-lg max-w-md mx-auto font-light"
              style={{ color: "var(--text-color)" }}
            >
              {accessDescription}
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-[0_4px_20px_rgba(0,0,0,0.08)] p-8 md:p-10 border border-gray-200">
            <form onSubmit={handleCodeSubmit} className="space-y-8">
              <div className="space-y-2">
                <label
                  htmlFor="code"
                  className="block text-sm font-medium mb-2"
                  style={{ color: "var(--primary-color)" }}
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
                    className="w-full px-4 py-4 rounded-lg border-2 border-gray-200 focus:outline-none text-lg transition-colors duration-200 placeholder-gray-400"
                    style={{
                      color: "var(--text-color)",
                      borderColor: code ? "var(--primary-color)" : undefined,
                    }}
                    onFocus={(e) => {
                      e.target.style.borderColor = "var(--primary-color)";
                    }}
                    onBlur={(e) => {
                      if (!code) {
                        e.target.style.borderColor = "#e5e7eb";
                      }
                    }}
                    required
                  />
                </div>
                <p className="text-sm text-gray-500 mt-2">
                  This code was provided in your registration confirmation
                </p>
              </div>

              <button
                type="submit"
                className="w-full py-4 px-6 rounded-lg transition-all duration-200 transform hover:scale-[1.02] font-bagnard text-xl tracking-wide shadow-sm text-white"
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
                Proceed to Checkout
              </button>
            </form>
          </div>

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
};

export default DynamicCheckoutPage;

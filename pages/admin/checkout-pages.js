import { useState, useEffect } from "react";
import Head from "next/head";
import Link from "next/link";

export default function CheckoutAdmin() {
  const [checkoutPages, setCheckoutPages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchCheckoutPages();
  }, []);

  const fetchCheckoutPages = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/checkout-pages");
      const result = await response.json();

      if (result.success) {
        setCheckoutPages(result.data);
      } else {
        setError(result.message);
      }
    } catch (err) {
      setError("Failed to fetch checkout pages");
      console.error("Error:", err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading checkout pages...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 mb-4">Error: {error}</p>
          <button
            onClick={fetchCheckoutPages}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>Checkout Pages Admin | Sacred Feminine</title>
      </Head>
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Checkout Pages Management
            </h1>
            <p className="text-gray-600">
              Manage your dynamic checkout pages. Create and edit pages in
              Sanity Studio.
            </p>
          </div>

          <div className="bg-white rounded-lg shadow overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold text-gray-900">
                  Active Checkout Pages ({checkoutPages.length})
                </h2>
                <a
                  href="https://sacred-feminine-studio.sanity.studio"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
                >
                  Open Sanity Studio
                </a>
              </div>
            </div>

            {checkoutPages.length === 0 ? (
              <div className="px-6 py-12 text-center">
                <p className="text-gray-500 mb-4">
                  No checkout pages found. Create one in Sanity Studio.
                </p>
                <a
                  href="https://sacred-feminine-studio.sanity.studio"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-700 underline"
                >
                  Go to Sanity Studio
                </a>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Retreat Name
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        URL
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Payment Options
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Access Code
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {checkoutPages.map((page) => (
                      <tr key={page.slug} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div>
                            <div className="text-sm font-medium text-gray-900">
                              {page.retreatName}
                            </div>
                            <div className="text-sm text-gray-500">
                              {page.title}
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <code className="bg-gray-100 px-2 py-1 rounded text-sm">
                            /checkout/{page.slug}
                          </code>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">
                            {page.paymentOptions?.filter((opt) => opt.isActive)
                              .length || 0}{" "}
                            options
                          </div>
                          <div className="text-sm text-gray-500">
                            $
                            {Math.min(
                              ...(page.paymentOptions
                                ?.filter((opt) => opt.isActive)
                                .map((opt) => opt.price) || [0])
                            )}{" "}
                            - $
                            {Math.max(
                              ...(page.paymentOptions
                                ?.filter((opt) => opt.isActive)
                                .map((opt) => opt.price) || [0])
                            )}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded text-sm font-mono">
                            {page.accessCode}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm space-x-2">
                          <Link
                            href={`/checkout/${page.slug}`}
                            className="text-blue-600 hover:text-blue-700 underline"
                          >
                            View
                          </Link>
                          <span className="text-gray-300">|</span>
                          <a
                            href={`https://sacred-feminine-studio.sanity.studio/structure/checkoutPage;${page.slug}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-green-600 hover:text-green-700 underline"
                          >
                            Edit
                          </a>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-blue-900 mb-3">
              How to Create a New Checkout Page
            </h3>
            <ol className="list-decimal list-inside space-y-2 text-blue-800">
              <li>Open Sanity Studio using the button above</li>
              <li>Navigate to "Checkout Page" in the content types</li>
              <li>Click "Create new" to add a new checkout page</li>
              <li>
                Fill in all required fields including retreat name, payment
                options, and access code
              </li>
              <li>Set the page to "Active" and publish</li>
              <li>
                Your page will be available at <code>/checkout/your-slug</code>
              </li>
            </ol>
          </div>

          <div className="mt-6 bg-green-50 border border-green-200 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-green-900 mb-3">
              Features
            </h3>
            <ul className="list-disc list-inside space-y-1 text-green-800">
              <li>Fully customizable color schemes and branding</li>
              <li>Dynamic payment options with custom pricing</li>
              <li>Access code protection for each checkout page</li>
              <li>Automatic Stripe integration</li>
              <li>Responsive design for all devices</li>
              <li>Real-time updates from Sanity CMS</li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}

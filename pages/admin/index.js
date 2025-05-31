import AdminLayout from "../../src/components/admin/AdminLayout";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";

export default function AdminDashboard() {
  const router = useRouter();
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

  const handleCardClick = (href, e) => {
    e.preventDefault();
    e.stopPropagation();
    console.log("Navigating to:", href);
    console.log("Router object:", router);
    console.log("Current route:", router.asPath);

    // Simple immediate navigation
    window.location.href = href;
  };

  const adminCards = [
    {
      title: "Content Management",
      description: "Edit website content and retreat information",
      href: "https://sacred-feminine-studio.sanity.studio",
      icon: "📝",
      color: "from-green-500 to-green-600",
      external: true,
    },
    {
      title: "User Management",
      description: "View registrations and user data",
      href: "/admin/users",
      icon: "👥",
      color: "from-purple-500 to-purple-600",
    },
    {
      title: "Analytics",
      description: "View site performance and metrics",
      href: "/admin/analytics",
      icon: "📊",
      color: "from-orange-500 to-orange-600",
    },
  ];

  return (
    <AdminLayout title="Admin Dashboard">
      <div className="px-4 sm:px-0">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Dashboard</h2>
          <p className="text-gray-600">
            Manage your Sacred Feminine website and retreats
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {adminCards.map((card) => (
            <div key={card.title} className="group">
              {card.external ? (
                <a
                  href={card.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block"
                >
                  <AdminCard card={card} />
                </a>
              ) : (
                <div
                  onClick={(e) => handleCardClick(card.href, e)}
                  className="block cursor-pointer"
                >
                  <AdminCard card={card} />
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Checkout Pages Section */}
        <div className="mt-12 bg-white rounded-lg shadow p-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-semibold text-gray-900">
              💳 Active Checkout Pages
            </h3>
            <a
              href="https://sacred-feminine-studio.sanity.studio"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors"
            >
              Create New Page
            </a>
          </div>

          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-800">
              {error}
            </div>
          )}

          {loading ? (
            <div className="flex items-center justify-center py-8">
              <div className="text-gray-500">Loading checkout pages...</div>
            </div>
          ) : checkoutPages.length === 0 ? (
            <div className="text-center py-8">
              <div className="text-gray-500 mb-4">No checkout pages found</div>
              <a
                href="https://sacred-feminine-studio.sanity.studio"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-700 underline"
              >
                Create your first checkout page
              </a>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {checkoutPages.map((page) => (
                <div
                  key={page.slug}
                  className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h4 className="font-medium text-gray-900 mb-1">
                        {page.retreatName}
                      </h4>
                      <p className="text-sm text-gray-600">{page.title}</p>
                    </div>
                    <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                      Active
                    </span>
                  </div>

                  <div className="space-y-2 mb-4">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">URL:</span>
                      <code className="bg-gray-100 px-2 py-1 rounded text-xs">
                        /checkout/{page.slug}
                      </code>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Access Code:</span>
                      <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded text-xs font-mono">
                        {page.accessCode}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Payment Options:</span>
                      <span className="text-gray-700">
                        {page.paymentOptions?.filter((opt) => opt.isActive)
                          .length || 0}
                      </span>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <a
                      href={`/checkout/${page.slug}`}
                      target="_blank"
                      className="flex-1 text-center px-3 py-2 bg-blue-50 text-blue-600 text-sm font-medium rounded hover:bg-blue-100 transition-colors"
                    >
                      View Page
                    </a>
                    <a
                      href={`https://sacred-feminine-studio.sanity.studio/structure/checkoutPage;${page.slug}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 text-center px-3 py-2 bg-green-50 text-green-600 text-sm font-medium rounded hover:bg-green-100 transition-colors"
                    >
                      Edit
                    </a>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="mt-12 bg-white rounded-lg shadow p-6">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">
            Quick Actions
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <a
              href="https://sacred-feminine-studio.sanity.studio"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <span className="text-2xl mr-3">🎨</span>
              <div>
                <div className="font-medium">Open Sanity Studio</div>
                <div className="text-sm text-gray-500">
                  Edit content directly
                </div>
              </div>
            </a>

            <div className="flex items-center p-4 border border-gray-200 rounded-lg opacity-50">
              <span className="text-2xl mr-3">📧</span>
              <div>
                <div className="font-medium">Email Campaign</div>
                <div className="text-sm text-gray-500">Coming soon</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}

const AdminCard = ({ card }) => (
  <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 group-hover:transform group-hover:scale-105 overflow-hidden">
    <div className={`bg-gradient-to-r ${card.color} p-6 text-white`}>
      <div className="text-4xl mb-4">{card.icon}</div>
      <h3 className="text-xl font-bold mb-2">{card.title}</h3>
      <p className="text-white/90">{card.description}</p>
    </div>
    <div className="p-6">
      <div className="flex items-center text-sm text-gray-500">
        <span>Click to access</span>
        {card.external && <span className="ml-2">🔗</span>}
      </div>
    </div>
  </div>
);

import { useState, useEffect } from "react";
import Link from "next/link";
import AdminLayout from "../../src/components/admin/AdminLayout";
import AdminAuth from "../../src/components/AdminAuth";

export default function CheckoutAdmin() {
  const [checkoutPages, setCheckoutPages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Check if user is already authenticated
    const authenticated = localStorage.getItem("adminAuthenticated") === "true";
    setIsAuthenticated(authenticated);
    setLoading(false);
  }, []);

  const handleAuthenticated = () => {
    setIsAuthenticated(true);
  };

  useEffect(() => {
    if (isAuthenticated) {
      fetchCheckoutPages();
    }
  }, [isAuthenticated]);

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
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div>Loading...</div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <AdminAuth onAuthenticated={handleAuthenticated} />;
  }

  return (
    <AdminLayout>
      <div style={{ padding: "2rem" }}>
        <h1>Checkout Pages Management</h1>

        {error && (
          <div
            style={{
              color: "#e74c3c",
              background: "#fdf2f2",
              padding: "1rem",
              borderRadius: "6px",
              marginBottom: "1rem",
            }}
          >
            {error}
          </div>
        )}

        {loading ? (
          <div>Loading checkout pages...</div>
        ) : (
          <div>
            <div style={{ marginBottom: "2rem" }}>
              <Link href="/admin/checkout-pages/new">
                <button
                  style={{
                    background:
                      "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                    color: "white",
                    border: "none",
                    padding: "1rem 2rem",
                    borderRadius: "8px",
                    cursor: "pointer",
                    fontWeight: "600",
                  }}
                >
                  Create New Checkout Page
                </button>
              </Link>
            </div>

            <div style={{ display: "grid", gap: "1rem" }}>
              {checkoutPages.length === 0 ? (
                <p>No checkout pages found.</p>
              ) : (
                checkoutPages.map((page) => (
                  <div
                    key={page._id}
                    style={{
                      background: "white",
                      padding: "1.5rem",
                      borderRadius: "8px",
                      border: "1px solid #e1e5e9",
                      boxShadow: "0 2px 10px rgba(0,0,0,0.05)",
                    }}
                  >
                    <h3>{page.title}</h3>
                    <p>{page.description}</p>
                    <div style={{ marginTop: "1rem" }}>
                      <Link href={`/admin/checkout-pages/${page._id}`}>
                        <button
                          style={{
                            background: "#667eea",
                            color: "white",
                            border: "none",
                            padding: "0.5rem 1rem",
                            borderRadius: "4px",
                            cursor: "pointer",
                            marginRight: "0.5rem",
                          }}
                        >
                          Edit
                        </button>
                      </Link>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}

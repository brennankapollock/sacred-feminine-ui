import { useState, useEffect } from "react";
import Link from "next/link";
import AdminLayout from "../../src/components/admin/AdminLayout";
import AdminAuth from "../../src/components/AdminAuth";

export default function RetreatsAdmin() {
  const [retreats, setRetreats] = useState([]);
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
      fetchRetreats();
    }
  }, [isAuthenticated]);

  const fetchRetreats = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/retreats");
      const result = await response.json();

      if (result.success) {
        setRetreats(result.data);
      } else {
        setError(result.message);
      }
    } catch (err) {
      setError("Failed to fetch retreats");
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
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "2rem" }}>
          <h1>Retreat Management</h1>
          <Link href="/admin">
            <button
              style={{
                background: "#6B7280",
                color: "white",
                border: "none",
                padding: "0.75rem 1.5rem",
                borderRadius: "8px",
                cursor: "pointer",
                fontWeight: "600",
              }}
            >
              ← Back to Dashboard
            </button>
          </Link>
        </div>

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

        <div style={{ marginBottom: "2rem" }}>
          <a
            href="https://sacred-feminine-studio.sanity.studio/structure/retreat"
            target="_blank"
            rel="noopener noreferrer"
          >
            <button
              style={{
                background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                color: "white",
                border: "none",
                padding: "1rem 2rem",
                borderRadius: "8px",
                cursor: "pointer",
                fontWeight: "600",
              }}
            >
              Create New Retreat in Sanity
            </button>
          </a>
        </div>

        {loading ? (
          <div>Loading retreats...</div>
        ) : (
          <div>
            {retreats.length === 0 ? (
              <div>
                <p>No retreats found.</p>
                <p style={{ marginTop: "1rem", color: "#666" }}>
                  Create your first retreat in Sanity Studio using the button above.
                </p>
              </div>
            ) : (
              <div style={{ display: "grid", gap: "1.5rem" }}>
                {retreats.map((retreat) => (
                  <div
                    key={retreat._id}
                    style={{
                      background: "white",
                      padding: "1.5rem",
                      borderRadius: "8px",
                      border: "1px solid #e1e5e9",
                      boxShadow: "0 2px 10px rgba(0,0,0,0.05)",
                    }}
                  >
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "start" }}>
                      <div style={{ flex: 1 }}>
                        <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "1rem" }}>
                          <h3 style={{ margin: 0 }}>{retreat.name}</h3>
                          {retreat.isLodgingCheckoutActive && (
                            <span
                              style={{
                                background: "#10B981",
                                color: "white",
                                padding: "0.25rem 0.75rem",
                                borderRadius: "1rem",
                                fontSize: "0.75rem",
                                fontWeight: "600",
                              }}
                            >
                              Integrated Flow Active
                            </span>
                          )}
                        </div>

                        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", marginBottom: "1rem" }}>
                          <div>
                            <p style={{ fontSize: "0.875rem", color: "#666", margin: "0.25rem 0" }}>
                              <strong>Date Range:</strong> {retreat.range || "Not set"}
                            </p>
                            <p style={{ fontSize: "0.875rem", color: "#666", margin: "0.25rem 0" }}>
                              <strong>Location:</strong> {retreat.location || "Not set"}
                            </p>
                            <p style={{ fontSize: "0.875rem", color: "#666", margin: "0.25rem 0" }}>
                              <strong>Price:</strong> {retreat.price || "Not set"}
                            </p>
                          </div>

                          {retreat.isLodgingCheckoutActive && (
                            <div>
                              <p style={{ fontSize: "0.875rem", color: "#666", margin: "0.25rem 0" }}>
                                <strong>URL Slug:</strong>
                                <code style={{ background: "#f3f4f6", padding: "0.125rem 0.25rem", borderRadius: "0.25rem", marginLeft: "0.25rem" }}>
                                  {retreat.slug || "Not set"}
                                </code>
                              </p>
                              <p style={{ fontSize: "0.875rem", color: "#666", margin: "0.25rem 0" }}>
                                <strong>Access Code:</strong>
                                <code style={{ background: "#fef3c7", color: "#92400e", padding: "0.125rem 0.5rem", borderRadius: "0.25rem", marginLeft: "0.25rem", fontWeight: "600" }}>
                                  {retreat.accessCode || "Not set"}
                                </code>
                              </p>
                              <p style={{ fontSize: "0.875rem", color: "#666", margin: "0.25rem 0" }}>
                                <strong>Lodging Options:</strong> {retreat.lodgingOptions?.length || 0}
                              </p>
                              <p style={{ fontSize: "0.875rem", color: "#666", margin: "0.25rem 0" }}>
                                <strong>Payment Options:</strong> {retreat.paymentOptions?.length || 0}
                              </p>
                            </div>
                          )}
                        </div>

                        {retreat.isLodgingCheckoutActive && retreat.slug && (
                          <div style={{ display: "flex", gap: "0.5rem", marginBottom: "1rem" }}>
                            <a
                              href={`/retreats/${retreat.slug}/lodging`}
                              target="_blank"
                              style={{
                                display: "inline-block",
                                background: "#3B82F6",
                                color: "white",
                                padding: "0.5rem 1rem",
                                borderRadius: "0.375rem",
                                textDecoration: "none",
                                fontSize: "0.875rem",
                                fontWeight: "500",
                              }}
                            >
                              View Lodging Page
                            </a>
                            <a
                              href={`/retreats/${retreat.slug}/checkout`}
                              target="_blank"
                              style={{
                                display: "inline-block",
                                background: "#10B981",
                                color: "white",
                                padding: "0.5rem 1rem",
                                borderRadius: "0.375rem",
                                textDecoration: "none",
                                fontSize: "0.875rem",
                                fontWeight: "500",
                              }}
                            >
                              View Checkout Page
                            </a>
                          </div>
                        )}
                      </div>

                      <div style={{ textAlign: "right" }}>
                        <a
                          href={`https://sacred-feminine-studio.sanity.studio/structure/retreat;${retreat._id}`}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <button
                            style={{
                              background: "#667eea",
                              color: "white",
                              border: "none",
                              padding: "0.5rem 1rem",
                              borderRadius: "4px",
                              cursor: "pointer",
                            }}
                          >
                            Edit in Sanity
                          </button>
                        </a>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        <div style={{ marginTop: "2rem", padding: "1rem", background: "#f8f9fa", borderRadius: "8px" }}>
          <h3>New Integrated Flow Instructions:</h3>
          <ul style={{ marginTop: "0.5rem", paddingLeft: "1.5rem" }}>
            <li>Create or edit a retreat in Sanity Studio</li>
            <li>Go to the "Lodging & Checkout" tab</li>
            <li>Add a URL slug (e.g., "summer-retreat-2025")</li>
            <li>Set an access code for the retreat</li>
            <li>Select available lodging options</li>
            <li>Configure payment options</li>
            <li>Enable "Integrated Lodging & Checkout" toggle</li>
            <li>Your retreat will automatically have lodging and checkout pages at:</li>
            <ul style={{ marginTop: "0.5rem", paddingLeft: "1.5rem" }}>
              <li><code>/retreats/[slug]/lodging</code></li>
              <li><code>/retreats/[slug]/checkout</code></li>
            </ul>
          </ul>
        </div>
      </div>
    </AdminLayout>
  );
}
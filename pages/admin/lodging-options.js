import { useState, useEffect } from "react";
import Link from "next/link";
import AdminLayout from "../../src/components/admin/AdminLayout";
import AdminAuth from "../../src/components/AdminAuth";

export default function LodgingAdmin() {
  const [lodgingOptions, setLodgingOptions] = useState([]);
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
      fetchLodgingOptions();
    }
  }, [isAuthenticated]);

  const fetchLodgingOptions = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/lodging-options");
      const result = await response.json();

      if (result.success) {
        setLodgingOptions(result.data);
      } else {
        setError(result.message);
      }
    } catch (err) {
      setError("Failed to fetch lodging options");
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
        <h1>Lodging Options Management</h1>

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
          <div>Loading lodging options...</div>
        ) : (
          <div>
            <div style={{ marginBottom: "2rem" }}>
              <a
                href="https://sacred-feminine-studio.sanity.studio/structure/lodgingOption"
                target="_blank"
                rel="noopener noreferrer"
              >
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
                  Create New Lodging Option in Sanity
                </button>
              </a>
            </div>

            <div style={{ display: "grid", gap: "1rem" }}>
              {lodgingOptions.length === 0 ? (
                <div>
                  <p>No lodging options found.</p>
                  <p style={{ marginTop: "1rem", color: "#666" }}>
                    Create your first lodging option in Sanity Studio using the button above.
                  </p>
                </div>
              ) : (
                lodgingOptions.map((option) => (
                  <div
                    key={option._id}
                    style={{
                      background: "white",
                      padding: "1.5rem",
                      borderRadius: "8px",
                      border: "1px solid #e1e5e9",
                      boxShadow: "0 2px 10px rgba(0,0,0,0.05)",
                    }}
                  >
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "start" }}>
                      <div>
                        <h3>{option.name}</h3>
                        <div
                          style={{
                            display: "inline-block",
                            background: "#f8f3ef",
                            padding: "0.25rem 0.75rem",
                            borderRadius: "1rem",
                            fontSize: "0.875rem",
                            color: "#927f73",
                            marginBottom: "0.5rem",
                          }}
                        >
                          {option.type}
                        </div>
                        <p style={{ color: "#666", marginBottom: "0.5rem" }}>
                          {option.description}
                        </p>
                        <p style={{ fontSize: "0.875rem", color: "#888" }}>
                          Display Order: {option.displayOrder}
                        </p>
                      </div>
                      <div style={{ textAlign: "right" }}>
                        <p style={{ fontSize: "1.5rem", fontWeight: "bold", marginBottom: "1rem" }}>
                          ${option.price}
                        </p>
                        <a
                          href={`https://sacred-feminine-studio.sanity.studio/structure/lodgingOption;${option._id}`}
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
                ))
              )}
            </div>
          </div>
        )}

        <div style={{ marginTop: "2rem", padding: "1rem", background: "#f8f9fa", borderRadius: "8px" }}>
          <h3>Instructions:</h3>
          <ul style={{ marginTop: "0.5rem", paddingLeft: "1.5rem" }}>
            <li>Click "Create New Lodging Option" to add new accommodation types</li>
            <li>Click "Edit in Sanity" to modify existing options</li>
            <li>Set "isActive" to true to show options on the lodging page</li>
            <li>Use "displayOrder" to control the order options appear</li>
          </ul>
        </div>
      </div>
    </AdminLayout>
  );
}

import React, { useState, useEffect } from "react";
import AdminAuth from "../components/AdminAuth";
import "./Admin.css";

const Admin: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is already authenticated
    const authenticated = localStorage.getItem("adminAuthenticated") === "true";
    setIsAuthenticated(authenticated);
    setLoading(false);
  }, []);

  const handleAuthenticated = () => {
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    localStorage.removeItem("adminAuthenticated");
    setIsAuthenticated(false);
  };

  if (loading) {
    return (
      <div className="admin-loading">
        <div className="loading-spinner"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <AdminAuth onAuthenticated={handleAuthenticated} />;
  }

  return (
    <div className="admin-container">
      <header className="admin-header">
        <div className="admin-header-content">
          <h1>Sacred Feminine Admin Panel</h1>
          <button onClick={handleLogout} className="logout-button">
            Logout
          </button>
        </div>
      </header>

      <main className="admin-main">
        <div className="admin-grid">
          <div className="admin-card">
            <div className="card-icon">📝</div>
            <h3>Content Management</h3>
            <p>Manage articles, blog posts, and page content</p>
            <button className="card-button">Manage Content</button>
          </div>

          <div className="admin-card">
            <div className="card-icon">👥</div>
            <h3>User Management</h3>
            <p>View and manage user accounts and permissions</p>
            <button className="card-button">Manage Users</button>
          </div>

          <div className="admin-card">
            <div className="card-icon">📊</div>
            <h3>Analytics</h3>
            <p>View site analytics and user engagement metrics</p>
            <button className="card-button">View Analytics</button>
          </div>

          <div className="admin-card">
            <div className="card-icon">⚙️</div>
            <h3>Settings</h3>
            <p>Configure site settings and preferences</p>
            <button className="card-button">Site Settings</button>
          </div>

          <div className="admin-card">
            <div className="card-icon">🎨</div>
            <h3>Media Library</h3>
            <p>Upload and manage images, videos, and documents</p>
            <button className="card-button">Media Library</button>
          </div>

          <div className="admin-card">
            <div className="card-icon">📧</div>
            <h3>Communications</h3>
            <p>Manage newsletters, notifications, and messages</p>
            <button className="card-button">Communications</button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Admin;

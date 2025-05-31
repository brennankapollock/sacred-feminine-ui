import React, { useState } from "react";
import styles from "./AdminAuth.module.css";

interface AdminAuthProps {
  onAuthenticated: () => void;
}

const AdminAuth: React.FC<AdminAuthProps> = ({ onAuthenticated }) => {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    // Replace with your actual password or implement proper authentication
    const ADMIN_PASSWORD = process.env.REACT_APP_ADMIN_PASSWORD || "admin123";

    if (password === ADMIN_PASSWORD) {
      localStorage.setItem("adminAuthenticated", "true");
      onAuthenticated();
    } else {
      setError("Invalid password");
    }

    setLoading(false);
  };

  return (
    <div className={styles.adminAuthContainer}>
      <div className={styles.adminAuthCard}>
        <h2>Admin Access</h2>
        <p>Please enter the admin password to continue</p>

        <form onSubmit={handleSubmit} className={styles.adminAuthForm}>
          <div className={styles.formGroup}>
            <input
              type="password"
              placeholder="Enter admin password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className={styles.passwordInput}
            />
          </div>

          {error && <div className={styles.errorMessage}>{error}</div>}

          <button
            type="submit"
            disabled={loading}
            className={styles.authButton}
          >
            {loading ? "Authenticating..." : "Access Admin Panel"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminAuth;

import React, { useState } from 'react';

interface SimpleLoginProps {
  onLogin: () => void;
}

const SimpleLogin: React.FC<SimpleLoginProps> = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // Simple hardcoded admin credentials
  const ADMIN_EMAIL = 'admin@enzo.com';
  const ADMIN_PASSWORD = 'admin123';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // Simple credential check
    if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
      // Store login state in localStorage
      localStorage.setItem('isAdminLoggedIn', 'true');
      localStorage.setItem('adminLoginTime', Date.now().toString());
      onLogin();
    } else {
      setError('Invalid admin credentials. Please try again.');
    }

    setLoading(false);
  };

  return (
    <div className="login-container">
      <div className="login-form">
        <h2>Enzo Admin Panel</h2>
        <p className="login-subtitle">Simple Admin Access</p>
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@enzo.com"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="admin123"
              required
            />
          </div>
          {error && <div className="error-message">{error}</div>}
          <button type="submit" disabled={loading}>
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>
        
        <div className="default-credentials">
          <p><strong>Admin Credentials:</strong></p>
          <p>Email: admin@enzo.com</p>
          <p>Password: admin123</p>
          
          <div className="simple-auth-note">
            <p><strong>ℹ️ Simple Authentication:</strong></p>
            <p>This uses local browser storage instead of Firebase Authentication.</p>
            <p>Perfect for admin-only access without complex user management.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SimpleLogin;
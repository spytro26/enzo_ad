import React, { type ReactNode, useState, useEffect } from 'react';

interface SimpleProtectedRouteProps {
  children: ReactNode;
  LoginComponent: React.ComponentType<{ onLogin: () => void }>;
}

const SimpleProtectedRoute: React.FC<SimpleProtectedRouteProps> = ({ children, LoginComponent }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkLoginStatus();
  }, []);

  const checkLoginStatus = () => {
    const isLoggedIn = localStorage.getItem('isAdminLoggedIn') === 'true';
    const loginTime = localStorage.getItem('adminLoginTime');
    
    if (isLoggedIn && loginTime) {
      const loginTimestamp = parseInt(loginTime);
      const currentTime = Date.now();
      const sessionDuration = 24 * 60 * 60 * 1000; // 24 hours
      
      if (currentTime - loginTimestamp > sessionDuration) {
        // Session expired
        localStorage.removeItem('isAdminLoggedIn');
        localStorage.removeItem('adminLoginTime');
        setIsLoggedIn(false);
      } else {
        setIsLoggedIn(true);
      }
    } else {
      setIsLoggedIn(false);
    }
    
    setLoading(false);
  };

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('isAdminLoggedIn');
    localStorage.removeItem('adminLoginTime');
    setIsLoggedIn(false);
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading...</p>
      </div>
    );
  }

  if (!isLoggedIn) {
    return <LoginComponent onLogin={handleLogin} />;
  }

  // Provide logout function to children
  return (
    <div className="app-container">
      {React.cloneElement(children as React.ReactElement, { onLogout: handleLogout } as any)}
    </div>
  );
};

export default SimpleProtectedRoute;
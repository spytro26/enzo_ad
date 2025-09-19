import React from 'react';

interface SimpleHeaderProps {
  onLogout?: () => void;
}

const SimpleHeader: React.FC<SimpleHeaderProps> = ({ onLogout }) => {
  return (
    <header className="admin-header">
      <div className="header-content">
        <div className="header-left">
          <h1>Enzo Admin Panel</h1>
        </div>
        <div className="header-right">
          <span className="user-info">
            Welcome, Admin
          </span>
          {onLogout && (
            <button onClick={onLogout} className="logout-button">
              Logout
            </button>
          )}
        </div>
      </div>
    </header>
  );
};

export default SimpleHeader;
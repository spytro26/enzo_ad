import React from 'react';
import { signOut } from 'firebase/auth';
import { auth } from '../../firebase';

interface HeaderProps {
  user?: any;
}

const Header: React.FC<HeaderProps> = ({ user }) => {
  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <header className="admin-header">
      <div className="header-content">
        <div className="header-left">
          <h1>Enzo Admin Panel</h1>
        </div>
        <div className="header-right">
          {user && (
            <>
              <span className="user-info">
                Welcome, {user.email}
              </span>
              <button onClick={handleLogout} className="logout-button">
                Logout
              </button>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
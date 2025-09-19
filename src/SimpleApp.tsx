import { useState } from 'react';
import SimpleProtectedRoute from './components/SimpleProtectedRoute';
import SimpleLogin from './components/SimpleLogin';
import SimpleHeader from './components/SimpleHeader';
import UserList from './components/UserList';
import UserDetail from './components/UserDetail';
import './App.css';

interface UserType {
  id: string;
  name: string;
  phone?: string;
  number?: string;
  city: string;
  coldRoom?: any;
  freezer?: any;
  blaster?: any;
  [key: string]: any;
}

interface AppContentProps {
  onLogout: () => void;
}

const AppContent: React.FC<AppContentProps> = ({ onLogout }) => {
  const [selectedUser, setSelectedUser] = useState<UserType | null>(null);

  const handleUserSelect = (user: UserType) => {
    setSelectedUser(user);
  };

  const handleBackToList = () => {
    setSelectedUser(null);
  };

  return (
    <div className="app-content">
      <SimpleHeader onLogout={onLogout} />
      <main className="main-content">
        {selectedUser ? (
          <UserDetail user={selectedUser} onBack={handleBackToList} />
        ) : (
          <UserList onUserSelect={handleUserSelect} />
        )}
      </main>
    </div>
  );
};

function SimpleApp() {
  return (
    <div className="app">
      <SimpleProtectedRoute LoginComponent={SimpleLogin}>
        <AppContent onLogout={() => {}} />
      </SimpleProtectedRoute>
    </div>
  );
}

export default SimpleApp;
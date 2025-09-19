import { useState, useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import type { User } from 'firebase/auth';
import { auth } from '../firebase';
import ProtectedRoute from './components/ProtectedRoute';
import Header from './components/Header';
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

function App() {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [selectedUser, setSelectedUser] = useState<UserType | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
    });

    return () => unsubscribe();
  }, []);

  const handleUserSelect = (user: UserType) => {
    setSelectedUser(user);
  };

  const handleBackToList = () => {
    setSelectedUser(null);
  };

  return (
    <div className="app">
      <ProtectedRoute>
        <Header user={currentUser} />
        <main className="main-content">
          {selectedUser ? (
            <UserDetail user={selectedUser} onBack={handleBackToList} />
          ) : (
            <UserList onUserSelect={handleUserSelect} />
          )}
        </main>
      </ProtectedRoute>
    </div>
  );
}

export default App;

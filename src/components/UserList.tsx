import React, { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../firebase';

type CalculationType = 'cold_room' | 'blast_freezer' | 'freezer_room';

interface StoredCalculationData {
  id: string;
  userId: string;
  calculationType: CalculationType;
  userName: string;
  projectName: string;
  roomLength: number;
  roomWidth: number;
  roomHeight: number;
  roomVolume: number;
  roomTemperature: number;
  productName: string;
  productQuantity: number;
  dailyLoading: number;
  totalLoad: number;
  totalLoadWithSafety: number;
  totalLoadBTU: number;
  totalTransmissionLoad: number;
  totalProductLoad: number;
  totalMiscellaneousLoad: number;
  createdAt: any;
  updatedAt: any;
}

interface User {
  id: string;
  name: string;
  phone?: string;
  email?: string;
  city: string;
  userType?: string;
  createdAt?: any;
  updatedAt?: any;
  calculations?: StoredCalculationData[];
  [key: string]: any;
}

interface UserListProps {
  onUserSelect: (user: User) => void;
}

const UserList: React.FC<UserListProps> = ({ onUserSelect }) => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      
      // Fetch users
      const usersSnapshot = await getDocs(collection(db, 'users'));
      const usersData: User[] = usersSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      } as User));

      // Fetch user calculations
      const calculationsSnapshot = await getDocs(collection(db, 'user_calculations'));
      const calculationsData: StoredCalculationData[] = calculationsSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      } as StoredCalculationData));

      // Group calculations by userId
      const calculationsByUser: { [userId: string]: StoredCalculationData[] } = {};
      calculationsData.forEach(calc => {
        if (!calculationsByUser[calc.userId]) {
          calculationsByUser[calc.userId] = [];
        }
        calculationsByUser[calc.userId].push(calc);
      });

      // Merge calculations with users
      const enrichedUsers = usersData.map(user => ({
        ...user,
        calculations: calculationsByUser[user.id] || []
      }));

      setUsers(enrichedUsers);
    } catch (error) {
      console.error('Error fetching data:', error);
      setError('Failed to fetch users and calculations. Please check your Firestore configuration.');
    } finally {
      setLoading(false);
    }
  };

  const filteredUsers = users.filter(user => 
    user.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.city?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.phone?.includes(searchTerm) ||
    user.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.calculations?.some(calc => 
      calc.projectName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      calc.productName?.toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading users...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-container">
        <p className="error-message">{error}</p>
        <button onClick={fetchUsers} className="retry-button">
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="user-list-container">
      <div className="user-list-header">
        <h2>User Management</h2>
        <div className="search-container">
          <input
            type="text"
            placeholder="Search by name, city, email, project, or product..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>
        <button onClick={fetchUsers} className="refresh-button">
          Refresh
        </button>
      </div>

      {filteredUsers.length === 0 ? (
        <div className="no-users">
          <p>No users found.</p>
          {users.length === 0 && (
            <div className="setup-instructions">
              <p>Make sure your Firestore has these collections:</p>
              <ul>
                <li>'users' - for user profiles</li>
                <li>'user_calculations' - for calculation data</li>
              </ul>
            </div>
          )}
        </div>
      ) : (
        <div className="user-table-container">
          <table className="user-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Contact</th>
                <th>City</th>
                <th>User Type</th>
                <th>Last Activity</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map(user => {
                const calculations = user.calculations || [];
                const coldRoomCalcs = calculations.filter(c => c.calculationType === 'cold_room');
                const freezerCalcs = calculations.filter(c => c.calculationType === 'freezer_room');
                const blasterCalcs = calculations.filter(c => c.calculationType === 'blast_freezer');
                
                return (
                  <tr key={user.id}>
                    <td>
                      <div className="user-name">
                        <strong>{user.name || 'Unknown User'}</strong>
                      </div>
                    </td>
                    <td>
                      <div className="user-contact">
                        {user.email && <div>{user.email}</div>}
                        {user.phone && <div>{user.phone}</div>}
                      </div>
                    </td>
                    <td>{user.city || 'N/A'}</td>
                    <td>
                      <span className={`user-type-badge ${user.userType || 'unknown'}`}>
                        {user.userType || 'Unknown'}
                      </span>
                    </td>
                    <td>
                      {user.updatedAt ? 
                        new Date(user.updatedAt.seconds * 1000).toLocaleDateString() : 
                        user.createdAt ? 
                        new Date(user.createdAt.seconds * 1000).toLocaleDateString() : 
                        'N/A'
                      }
                    </td>
                    <td>
                      <button
                        onClick={() => onUserSelect(user)}
                        className="view-details-button"
                      >
                        View Details ({calculations.length})
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      <div className="user-count">
        Showing {filteredUsers.length} of {users.length} users
      </div>
    </div>
  );
};

export default UserList;
import React, { useState } from 'react';

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

interface UserDetailProps {
  user: User;
  onBack: () => void;
}

type TabType = 'overview' | 'coldRoom' | 'freezer' | 'blaster';

const UserDetail: React.FC<UserDetailProps> = ({ user, onBack }) => {
  const [activeTab, setActiveTab] = useState<TabType>('overview');

  const calculations = user.calculations || [];
  const coldRoomCalcs = calculations.filter(c => c.calculationType === 'cold_room');
  const freezerCalcs = calculations.filter(c => c.calculationType === 'freezer_room');
  const blasterCalcs = calculations.filter(c => c.calculationType === 'blast_freezer');

  const hasCalculations = calculations.length > 0;

  // Helper function to format numbers to 1 decimal place
  const formatNumber = (num: number): string => {
    return num.toFixed(1);
  };

  const renderOverview = () => (
    <div className="overview-content">
      <h3>User Information</h3>
      <div className="info-grid">
        <div className="info-item">
          <label>Name:</label>
          <span>{user.name || 'N/A'}</span>
        </div>
        <div className="info-item">
          <label>Email:</label>
          <span>{user.email || 'N/A'}</span>
        </div>
        <div className="info-item">
          <label>Phone:</label>
          <span>{user.phone || 'N/A'}</span>
        </div>
        <div className="info-item">
          <label>City:</label>
          <span>{user.city || 'N/A'}</span>
        </div>
        <div className="info-item">
          <label>User Type:</label>
          <span>{user.userType || 'N/A'}</span>
        </div>
        <div className="info-item">
          <label>Total Calculations:</label>
          <span>{calculations.length}</span>
        </div>
        <div className="info-item">
          <label>Last Activity:</label>
          <span>
            {user.updatedAt ? 
              new Date(user.updatedAt.seconds * 1000).toLocaleString() : 
              user.createdAt ? 
              new Date(user.createdAt.seconds * 1000).toLocaleString() : 
              'N/A'
            }
          </span>
        </div>
      </div>

      <h3>Calculations Summary</h3>
      <div className="calculations-overview">
        <div className={`calc-overview-card ${coldRoomCalcs.length > 0 ? 'has-data' : 'no-data'}`}>
          <h4>🏠 Cold Room</h4>
          <p>{coldRoomCalcs.length} calculation(s)</p>
          {coldRoomCalcs.length > 0 && (
            <div className="calc-preview">
              <small>Latest: {coldRoomCalcs[coldRoomCalcs.length - 1]?.projectName}</small>
            </div>
          )}
        </div>
        <div className={`calc-overview-card ${freezerCalcs.length > 0 ? 'has-data' : 'no-data'}`}>
          <h4>❄️ Freezer Room</h4>
          <p>{freezerCalcs.length} calculation(s)</p>
          {freezerCalcs.length > 0 && (
            <div className="calc-preview">
              <small>Latest: {freezerCalcs[freezerCalcs.length - 1]?.projectName}</small>
            </div>
          )}
        </div>
        <div className={`calc-overview-card ${blasterCalcs.length > 0 ? 'has-data' : 'no-data'}`}>
          <h4>💨 Blast Freezer</h4>
          <p>{blasterCalcs.length} calculation(s)</p>
          {blasterCalcs.length > 0 && (
            <div className="calc-preview">
              <small>Latest: {blasterCalcs[blasterCalcs.length - 1]?.projectName}</small>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  const renderCalculationDetails = (calculations: StoredCalculationData[], title: string) => {
    if (calculations.length === 0) {
      return (
        <div className="no-calculations">
          <p>No {title.toLowerCase()} calculations found for this user.</p>
        </div>
      );
    }

    return (
      <div className="calculations-details">
        <h3>{title} Calculations ({calculations.length})</h3>
        {calculations.map((calc, index) => (
          <div key={calc.id} className="calculation-card">
            <div className="calc-header">
              <h4>{calc.projectName || `Project ${index + 1}`}</h4>
              <div className="calc-meta">
                <span className="calc-type">{calc.calculationType.replace('_', ' ').toUpperCase()}</span>
                <span className="calc-date">
                  {calc.createdAt ? new Date(calc.createdAt.seconds * 1000).toLocaleDateString() : 'N/A'}
                </span>
              </div>
            </div>
            
            <div className="calc-content">
              <div className="calc-section">
                <h5>Room Specifications</h5>
                <div className="calc-grid">
                  <div className="calc-item">
                    <label>Dimensions:</label>
                    <span>{formatNumber(calc.roomLength)}m × {formatNumber(calc.roomWidth)}m × {formatNumber(calc.roomHeight)}m</span>
                  </div>
                  <div className="calc-item">
                    <label>Volume:</label>
                    <span>{formatNumber(calc.roomVolume)} m³</span>
                  </div>
                  <div className="calc-item">
                    <label>Target Temperature:</label>
                    <span>{formatNumber(calc.roomTemperature)}°C</span>
                  </div>
                </div>
              </div>

              <div className="calc-section">
                <h5>Product Details</h5>
                <div className="calc-grid">
                  <div className="calc-item">
                    <label>Product:</label>
                    <span>{calc.productName}</span>
                  </div>
                  <div className="calc-item">
                    <label>Quantity:</label>
                    <span>{formatNumber(calc.productQuantity)} kg</span>
                  </div>
                  <div className="calc-item">
                    <label>Daily Loading:</label>
                    <span>{formatNumber(calc.dailyLoading)} kg/day</span>
                  </div>
                </div>
              </div>

              <div className="calc-section">
                <h5>Load Calculations</h5>
                <div className="calc-grid">
                  <div className="calc-item">
                    <label>Base Total Load:</label>
                    <span>{formatNumber(calc.totalLoad)} kW</span>
                  </div>
                  <div className="calc-item highlight">
                    <label>Total Load (with safety):</label>
                    <span>{formatNumber(calc.totalLoadWithSafety)} kW</span>
                  </div>
                  <div className="calc-item">
                    <label>Total Load (BTU/hr):</label>
                    <span>{formatNumber(calc.totalLoadBTU)} BTU/hr</span>
                  </div>
                </div>
              </div>

              <div className="calc-section">
                <h5>Load Breakdown</h5>
                <div className="calc-grid">
                  <div className="calc-item">
                    <label>Transmission Load:</label>
                    <span>{formatNumber(calc.totalTransmissionLoad)} kW</span>
                  </div>
                  <div className="calc-item">
                    <label>Product Load:</label>
                    <span>{formatNumber(calc.totalProductLoad)} kW</span>
                  </div>
                  <div className="calc-item">
                    <label>Miscellaneous Load:</label>
                    <span>{formatNumber(calc.totalMiscellaneousLoad)} kW</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  };

  const availableTabs = [
    { id: 'overview' as TabType, label: 'Overview', available: true },
    { id: 'coldRoom' as TabType, label: 'Cold Room', available: coldRoomCalcs.length > 0 },
    { id: 'freezer' as TabType, label: 'Freezer Room', available: freezerCalcs.length > 0 },
    { id: 'blaster' as TabType, label: 'Blast Freezer', available: blasterCalcs.length > 0 }
  ];

  return (
    <div className="user-detail-container">
      <div className="user-detail-header">
        <button onClick={onBack} className="back-button">
          ← Back to Users
        </button>
        <h2>{user.name || 'User Details'}</h2>
      </div>

      <div className="tabs-container">
        <div className="tabs">
          {availableTabs.map(tab => (
            <button
              key={tab.id}
              className={`tab ${activeTab === tab.id ? 'active' : ''} ${!tab.available ? 'disabled' : ''}`}
              onClick={() => tab.available && setActiveTab(tab.id)}
              disabled={!tab.available}
            >
              {tab.label}
              {!tab.available && <span className="unavailable-indicator"> (N/A)</span>}
            </button>
          ))}
        </div>

        <div className="tab-content">
          {activeTab === 'overview' && renderOverview()}
          {activeTab === 'coldRoom' && renderCalculationDetails(coldRoomCalcs, 'Cold Room')}
          {activeTab === 'freezer' && renderCalculationDetails(freezerCalcs, 'Freezer Room')}
          {activeTab === 'blaster' && renderCalculationDetails(blasterCalcs, 'Blast Freezer')}
        </div>
      </div>

      {!hasCalculations && (
        <div className="no-calculations-warning">
          <p>⚠️ This user has no calculation records available.</p>
        </div>
      )}
    </div>
  );
};

export default UserDetail;
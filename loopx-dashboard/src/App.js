import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import DeviceCycle from './DeviceCycle';
import LogTimeCalculation from './LogTimeCalculation';
import './App.css';

function App() {
  return (
    <div className="App" style={{ display: 'flex', height: '100vh' }}>
      <Router>
        {/* Left Column for Navigation */}
        <div style={{
          backgroundColor: '#282c34',
          color: 'white',
          width: '15%', // 15% of the screen
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          padding: '20px',
        }}>
          <h2>LoopX Dashboard</h2>
          <nav>
            <ul style={{ listStyleType: "none", padding: 0 }}>
              <li style={{ marginBottom: '20px' }}>
                <Link to="/device-cycle" style={linkButtonStyle}>Device Cycle</Link>
              </li>
              <li>
                <Link to="/log-time-calculation" style={linkButtonStyle}>Log Time Calculation</Link>
              </li>
            </ul>
          </nav>
        </div>

        {/* Right Column for Content */}
        <div style={{ width: '85%', padding: '20px' }}>
          <Routes>
            <Route path="/device-cycle" element={<DeviceCycle />} />
            <Route path="/log-time-calculation" element={<LogTimeCalculation />} />
            <Route path="/" element={
              <div>
                <h2>Welcome to LoopX Dashboard</h2>
                <p>Select a page to view the logs.</p>
              </div>
            } />
          </Routes>
        </div>
      </Router>
    </div>
  );
}

// Styling for the buttons with color changes
const linkButtonStyle = {
  color: 'white',
  textDecoration: 'none',
  backgroundColor: '#4CAF50', // Change to your desired button color
  padding: '10px 20px',
  borderRadius: '5px',
  fontSize: '18px',
  textAlign: 'center',
  display: 'inline-block',
  border: 'none',
  cursor: 'pointer',
  transition: 'background-color 0.3s ease', // Smooth hover transition
};

// Adding hover effect with darker background
const hoverStyle = {
  ...linkButtonStyle,
  backgroundColor: '#45a049', // Darker shade for hover
};

export default App;

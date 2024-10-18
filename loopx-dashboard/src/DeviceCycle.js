import React, { useState, useEffect } from 'react';

function DeviceCycle() {
  const [deviceCycleData, setDeviceCycleData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [selectedHost, setSelectedHost] = useState('');
  const [selectedDevice, setSelectedDevice] = useState('');
  const [selectedAnomalyFlag, setSelectedAnomalyFlag] = useState('');

  const hosts = ['cem003', 'cem004', 'cem006', 'cem008'];
  const devices = ['Camera Front', 'Camera Rear', 'LiDAR Front', 'LiDAR Rear', 'NA'];
  const anomalyFlags = ['Normal', 'Anomaly'];

  useEffect(() => {
    // Fetch data from the backend
    fetch('http://localhost:5000/api/device-cycle')
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        return response.json();
      })
      .then(data => {
        console.log('Fetched Data:', data);
        setDeviceCycleData(data);
        setFilteredData(data); // Initial load to display all data
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

  // Filter logic
  useEffect(() => {
    let filtered = deviceCycleData;

    if (selectedHost) {
      filtered = filtered.filter(item => item.DeviceID === selectedHost);
    }
    if (selectedDevice) {
      filtered = filtered.filter(item => item.Device === selectedDevice);
    }
    if (selectedAnomalyFlag) {
      filtered = filtered.filter(item => item.AnomalyFlag === selectedAnomalyFlag);
    }

    setFilteredData(filtered);
  }, [selectedHost, selectedDevice, selectedAnomalyFlag, deviceCycleData]);

  return (
    <div>
      <h2>Device Cycle Logs</h2>

      {/* Slicers */}
      <div style={{ display: 'flex', gap: '20px', marginBottom: '20px' }}>
        {/* Host Slicer */}
        <div>
          <label>Host</label>
          <select value={selectedHost} onChange={(e) => setSelectedHost(e.target.value)}>
            <option value="">All Hosts</option>
            {hosts.map((host, index) => (
              <option key={index} value={host}>{host}</option>
            ))}
          </select>
        </div>

        {/* Device Slicer */}
        <div>
          <label>Device</label>
          <select value={selectedDevice} onChange={(e) => setSelectedDevice(e.target.value)}>
            <option value="">All Devices</option>
            {devices.map((device, index) => (
              <option key={index} value={device}>{device}</option>
            ))}
          </select>
        </div>

        {/* Anomaly Flag Slicer */}
        <div>
          <label>Anomaly Flag</label>
          <select value={selectedAnomalyFlag} onChange={(e) => setSelectedAnomalyFlag(e.target.value)}>
            <option value="">All Anomaly Flags</option>
            {anomalyFlags.map((flag, index) => (
              <option key={index} value={flag}>{flag}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Table */}
      <table border="1" cellPadding="10" style={{ width: '100%', textAlign: 'left' }}>
        <thead>
          <tr>
            <th>Anomaly Flag</th>
            <th>Device</th>
            <th>Device ID</th>
            <th>Log Level</th>
            <th>Message</th>
            <th>Time Difference</th>
            <th>Timestamp</th>
            <th>Device Status</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.length === 0 ? (
            <tr><td colSpan="8">No data available</td></tr>
          ) : (
            filteredData.map((item, index) => (
              <tr key={index}>
                <td>{item.AnomalyFlag || "N/A"}</td>
                <td>{item.Device || "N/A"}</td>
                <td>{item.DeviceID || "N/A"}</td>
                <td>{item.LogLevel || "N/A"}</td>
                <td>{item.Message || "N/A"}</td>
                <td>{item.TimeDifference || "N/A"}</td>
                <td>{item.Timestamp || "N/A"}</td>
                <td>{item.DeviceStatus || "N/A"}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default DeviceCycle;

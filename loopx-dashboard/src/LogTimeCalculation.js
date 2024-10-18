import React, { useState, useEffect } from 'react';

function LogTimeCalculation() {
  const [timeCalculationData, setTimeCalculationData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [selectedHost, setSelectedHost] = useState('');

  const hosts = ['cem003', 'cem004', 'cem006', 'cem008'];

  useEffect(() => {
    // Fetch data from the backend
    fetch('http://localhost:5000/api/time-calculation')
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        return response.json();
      })
      .then(data => {
        console.log('Time Calculation Data:', data);
        setTimeCalculationData(data);
        setFilteredData(data); // Initial load to display all data
      })
      .catch(error => {
        console.error('Error fetching time calculation data:', error);
      });
  }, []);

  // Filter logic for Host
  useEffect(() => {
    let filtered = timeCalculationData;

    if (selectedHost) {
      filtered = filtered.filter(item => item.Host === selectedHost);
    }

    setFilteredData(filtered);
  }, [selectedHost, timeCalculationData]);

  const formatToTwoDecimal = (value) => {
    return value ? value.toFixed(2) : "N/A"; // Format value to 2 decimal places or return 'N/A' if null
  };

  return (
    <div>
      <h2>Log Time Calculation</h2>

      {/* Host Slicer */}
      <div style={{ marginBottom: '20px' }}>
        <label>Host</label>
        <select value={selectedHost} onChange={(e) => setSelectedHost(e.target.value)}>
          <option value="">All Hosts</option>
          {hosts.map((host, index) => (
            <option key={index} value={host}>{host}</option>
          ))}
        </select>
      </div>

      {/* Table */}
      <table border="1" cellPadding="10" style={{ width: '100%', textAlign: 'left' }}>
        <thead>
          <tr>
            <th>UID</th>
            <th>Host</th>
            <th>Master Duration (Hours)</th>
            <th>Rosout Duration (Hours)</th>
            <th>Timestamp</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.length === 0 ? (
            <tr><td colSpan="5">No data available</td></tr>
          ) : (
            filteredData.map((item, index) => (
              <tr key={index}>
                <td>{item.UID || "N/A"}</td>
                <td>{item.Host || "N/A"}</td>
                <td>{item['Sum of MasterDurationInHours'] ? formatToTwoDecimal(item['Sum of MasterDurationInHours']) : "N/A"}</td>
                <td>{item['Sum of RosoutDurationInHours'] ? formatToTwoDecimal(item['Sum of RosoutDurationInHours']) : "N/A"}</td>
                <td>{item.Timestamp || "N/A"}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default LogTimeCalculation;

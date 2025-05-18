import { useState } from 'react'
import './App.css'

function App() {
  const [ferries, setFerries] = useState([]);

  const fetchFerries = async () => {
    try {
      const apiKey = import.meta.env.VITE_AT_SUBSCRIPTION_PRIMARY_KEY;
      const atApiUrl = `https://pp-api.at.govt.nz/realtime/legacy/ferrypositions`;
      console.log('API Key:', apiKey);
      if (!apiKey) {
        alert('API key is missing. Please check your environment configuration.');
        return;
      }
      const response = await fetch(atApiUrl, {
        method: 'GET',
        headers: {
          'Ocp-Apim-Subscription-Key': apiKey,
        },
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      console.log(data.response);
      setFerries(data.response);
      
    } catch (error) {
      console.error('Failed to fetch ferries:', error);
      alert('Failed to fetch ferry data. Please try again later.');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchFerries();
  };

  return (
    <div className="app">
      <h1>Auckland Ferry Information</h1>
      <button type="button" onClick={handleSubmit}>Get Info</button>
      {ferries && ferries.map((ferry, index) => (
        <div key={ferry.mmsi}>
          <h2>Ferry Operator: {ferry.operator || 'N/A'}</h2>
          <p>Timestamp: {ferry.timestamp || 'N/A'}</p>
          <p>Callsign: {ferry.callsign || 'N/A'}</p>
          <p>Longitude: {ferry.lng || 'N/A'}</p>
          <p>Latitude: {ferry.lat || 'N/A'}</p>
          <p>Vessel: {ferry.vessel || 'N/A'}</p>
        </div>
      ))}
      <div className="footer">
        <p>Data provided by Auckland Transport</p>
        <p>Powered by React</p>
        <p>© 2023 Auckland Transport</p>
        <p>All rights reserved</p>
      </div>
    </div>
  );
}

export default App


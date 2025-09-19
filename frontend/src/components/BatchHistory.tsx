import React, { useState } from 'react';
import axios from 'axios';

// Define a type for the history data for better TypeScript support
interface TraceEvent {
  status: string;
  location: string;
  timestamp: string;
}

interface BatchData {
  batchId: string;
  farmerName: string;
  location: string;
  herbType: string;
  quantityKg: string;
  gpsCoordinates: string;
  harvestDate: string;
  farmingMethod: string;
  qualityScore: string;
  history: TraceEvent[];
}

function BatchHistory() {
  const [batchId, setBatchId] = useState('');
  const [batchData, setBatchData] = useState<BatchData | null>(null);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsLoading(true);
    setError('');
    setBatchData(null);

    try {
      const response = await axios.get(`/api/herbs/${batchId}`); // Using relative path
      setBatchData(response.data);
    } catch (err: any) {
      setError(`Error: ${err.response?.data?.error || 'Batch not found.'}`);
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={{ border: '1px solid #ccc', padding: '20px', margin: '20px', borderRadius: '8px' }}>
      <h2>Consumer Verification</h2>
      <form onSubmit={handleSearch}>
        <label>Enter Batch ID: </label>
        <input
          type="number"
          value={batchId}
          onChange={(e) => setBatchId(e.target.value)}
          placeholder="e.g., 1"
          required
        />
        <button type="submit" disabled={isLoading}>
          {isLoading ? 'Verifying...' : 'Verify Batch'}
        </button>
      </form>

      {error && <p style={{ color: 'red', marginTop: '20px' }}>{error}</p>}

      {batchData && (
        <div style={{ marginTop: '20px', textAlign: 'left' }}>
          <h3>✅ Verified Batch #{batchData.batchId}</h3>
          <p><strong>Herb Type:</strong> {batchData.herbType} ({batchData.quantityKg} kg)</p>
          <p><strong>Farming Method:</strong> {batchData.farmingMethod}</p>
          <p><strong>AI Quality Score:</strong> {batchData.qualityScore}/10</p>
          <hr />
          <h4>Traceability History (Digital Passport):</h4>
          <ul style={{ listStyleType: 'none', paddingLeft: 0 }}>
            {batchData.history.map((event, index) => (
              <li key={index} style={{ borderBottom: '1px solid #eee', padding: '10px 0' }}>
                <p><strong>Status:</strong> {event.status}</p>
                <p><strong>Location:</strong> {event.location}</p>
                <p><strong>Date:</strong> {new Date(event.timestamp).toLocaleString()}</p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default BatchHistory;
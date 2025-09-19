import React, { useState } from 'react';
import axios from 'axios';

function CreateBatchForm() {
  // State for all form fields
  const [farmerName, setFarmerName] = useState('');
  const [location, setLocation] = useState('');
  const [herbType, setHerbType] = useState('');
  const [quantity, setQuantity] = useState('');
  const [gpsCoordinates, setGpsCoordinates] = useState('');
  const [harvestDate, setHarvestDate] = useState('');
  const [farmingMethod, setFarmingMethod] = useState('');
  const [soil_ph, setSoilPh] = useState('6.5'); // Default value
  const [rainfall_mm, setRainfallMm] = useState('500'); // Default value
  const [sunlight_hours, setSunlightHours] = useState('8'); // Default value

  // State for loading and messaging
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsLoading(true);
    setMessage('');

    try {
      const response = await axios.post('/api/herbs', { // Using relative path because of Vite proxy
        farmerName,
        location,
        herbType,
        quantity: parseInt(quantity),
        gpsCoordinates,
        harvestDate,
        farmingMethod,
        soil_ph: parseFloat(soil_ph),
        rainfall_mm: parseInt(rainfall_mm),
        sunlight_hours: parseFloat(sunlight_hours),
      });

      setMessage(`Success! Batch created. AI Score: ${response.data.qualityScore}. Tx Hash: ${response.data.transactionHash}`);
      // Clear form fields after successful submission
      setFarmerName('');
      setLocation('');
      setHerbType('');
      setQuantity('');
      setGpsCoordinates('');
      setHarvestDate('');
      setFarmingMethod('');

    } catch (error) {
      setMessage('Error: Failed to create batch. Please check the console.');
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={{ border: '1px solid #ccc', padding: '20px', margin: '20px', borderRadius: '8px' }}>
      <h2>Farmer Registration</h2>
      <form onSubmit={handleSubmit}>
        {/* All input fields from your UI */}
        <input value={farmerName} onChange={(e) => setFarmerName(e.target.value)} placeholder="Farmer Name" required />
        <input value={location} onChange={(e) => setLocation(e.target.value)} placeholder="Farm Location" required />
        <input value={herbType} onChange={(e) => setHerbType(e.target.value)} placeholder="Herb Type" required />
        <input type="number" value={quantity} onChange={(e) => setQuantity(e.target.value)} placeholder="Quantity (kg)" required />
        <input value={gpsCoordinates} onChange={(e) => setGpsCoordinates(e.target.value)} placeholder="GPS Coordinates" required />
        <input value={harvestDate} onChange={(e) => setHarvestDate(e.target.value)} placeholder="Harvest Date (dd-mm-yyyy)" required />
        <input value={farmingMethod} onChange={(e) => setFarmingMethod(e.target.value)} placeholder="Farming Method" required />
        
        <h4>AI Quality Assessment Parameters</h4>
        <input type="number" step="0.1" value={soil_ph} onChange={(e) => setSoilPh(e.target.value)} placeholder="Soil pH" required />
        <input type="number" value={rainfall_mm} onChange={(e) => setRainfallMm(e.target.value)} placeholder="Rainfall (mm)" required />
        <input type="number" step="0.1" value={sunlight_hours} onChange={(e) => setSunlightHours(e.target.value)} placeholder="Sunlight Hours/Day" required />

        <button type="submit" disabled={isLoading} style={{ marginTop: '20px' }}>
          {isLoading ? 'Registering Batch...' : 'Register New Batch'}
        </button>
      </form>
      {message && <p style={{ marginTop: '20px' }}>{message}</p>}
    </div>
  );
}

export default CreateBatchForm;
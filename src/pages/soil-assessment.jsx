import React, { useState } from 'react';

const SoilAssessmentPage = () => {
  const [address, setAddress] = useState('');
  const [plantType, setPlantType] = useState('');
  const [soilData, setSoilData] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Fetch and process soil assessment data based on user input
    // For now, we're just displaying the input in console
    console.log({ address, plantType });

    // You can integrate this with NASA's data and other APIs later
    const response = await fetch(`/api/soil-assessment`, {
      method: 'POST',
      body: JSON.stringify({ address, plantType }),
      headers: { 'Content-Type': 'application/json' },
    });

    const data = await response.json();
    setSoilData(data);
  };

  return (
    <div>
      <h1>Soil Quality Assessment</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Address:
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="Enter your farm address"
          />
        </label>

        <label>
          Plant Type:
          <select value={plantType} onChange={(e) => setPlantType(e.target.value)}>
            <option value="">Select Plant Type</option>
            <option value="wheat">Wheat</option>
            <option value="corn">Corn</option>
            {/* Add more plant options as needed */}
          </select>
        </label>

        <button type="submit">Submit</button>
      </form>

      {soilData && (
        <div>
          <h2>Assessment Results</h2>
          <p>Soil Suitability: {soilData.suitability}</p>
          {/* Display additional soil and plant recommendations here */}
        </div>
      )}
    </div>
  );
};

export default SoilAssessmentPage;

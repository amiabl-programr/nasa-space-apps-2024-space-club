// Example form component
import { fetchCoordinates } from '@/utils/fetchCoordinates';
import { useState } from 'react';
import Header from '@/components/header';

export default function SoilAssessmentForm() {
  const [address, setAddress] = useState("");
  const [error, setError] = useState('');
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');

    const [formData, setFormData] = useState({
      plantType: '',
      location: {
        latitude: "",
        longitude: ""
      }
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleAddressSubmit = async (e) => {
      e.preventDefault();
      try {
        const { latitude, longitude } = await fetchCoordinates(address);
       setLatitude(latitude);
      setLongitude(longitude);
        setError('');
      } catch (error) {
        console.error('Error fetching coordinates:', error);
        setError('Failed to fetch coordinates. Please check the address.');
      }
    };


    const handleSubmit = async (e) => {
      
        e.preventDefault();

        try {
            const response = await fetch('/api/soilAssessment', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ data: formData }),
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const result = await response.json();
            console.log(result); // Handle the result as needed
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
      <>
      <Header />
        <form onSubmit={handleAddressSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Enter Farm Address:</label>
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Get Coordinates
        </button>
      </form>


        <form onSubmit={handleSubmit}>
            <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Latitude:</label>
          <input
            type="number"
            value={latitude}
            onChange={(e) => setLatitude(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Longitude:</label>
          <input
            type="number"
            value={longitude}
            onChange={(e) => setLongitude(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>
            <input
                type="text"
                name="plantType"
                value={formData.plantType}
                onChange={handleChange}
                placeholder="Type of Plant"
                required
            />
            <button type="submit">Assess Soil</button>
        </form>
      
      </>
    );
}

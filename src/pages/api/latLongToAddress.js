// pages/api/latLongToAddress.js
import axios from 'axios';

export default async function handler(req, res) {
  const { latitude, longitude } = req.query;

  if (!latitude || !longitude) {
    return res.status(400).json({ error: 'Latitude and longitude are required' });
  }

  try {
    const apiKey = process.env.GOOGLE_MAPS_API_KEY; // Securely using the API key
    const response = await axios.get(
      `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${apiKey}`
    );

    console.log('Google Maps API Response:', response.data); // Log the response for debugging

    const address = response.data.results[0]?.formatted_address || 'Address not found';
    return res.status(200).json({ address });
  } catch (error) {
    console.error('Error fetching address:', error);
    return res.status(500).json({ error: 'Failed to fetch address' });
  }
}

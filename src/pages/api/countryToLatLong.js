// pages/api/countryToLatLong.js
import axios from 'axios';

export default async function handler(req, res) {
  const { country } = req.query;

  if (!country) {
    return res.status(400).json({ error: 'Country is required' });
  }

  try {
    const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY; // Securely using the API key
    const response = await axios.get(
      `https://maps.googleapis.com/maps/api/geocode/json?address=${country}&key=${apiKey}`
    );

    const location = response.data.results[0]?.geometry.location;
    if (!location) {
      return res.status(404).json({ error: 'Location not found' });
    }

    return res.status(200).json({
      latitude: location.lat,
      longitude: location.lng,
    });
  } catch (error) {
    console.error('Error fetching coordinates:', error);
    return res.status(500).json({ error: 'Failed to fetch coordinates' });
  }
}

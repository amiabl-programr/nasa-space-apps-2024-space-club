export default async function handler(req, res) {
    const { address } = req.query; // Get the address from the query parameters
    const apiKey = process.env.GOOGLE_MAPS_API_KEY; // Securely using the API key

  
    if (!address) {
      return res.status(400).json({ error: 'Address is required' });
    }
  
    try {
      const response = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${apiKey}`);
  
      if (!response.ok) {
        throw new Error('Failed to fetch coordinates');
      }
  
      const data = await response.json();
  
      if (data.results.length === 0) {
        return res.status(404).json({ error: 'No results found for the provided address' });
      }
  
      const { lat, lng } = data.results[0].geometry.location;
      return res.status(200).json({ latitude: lat, longitude: lng });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }
  
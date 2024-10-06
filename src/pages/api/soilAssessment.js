// pages/api/soilAssessment.js
import axios from 'axios';

export default async function handler(req, res) {
    if (req.method === 'POST') {
        try {
            // Extract data from the request body
            const { data } = req.body;

            // Log the data sent to the external API
            console.log('Received data:', data);

            // Make a request to the external API with the received data
            const response = await axios.post('https://early-maiga-codekage-a253f598.koyeb.app/v1/assess', {
                data, // Adjust this as needed based on the API's requirements
            });

            // Send the response back to the client
            res.status(200).json(response.data);
        } catch (error) {
            console.error('API request error:', error.response ? error.response.data : error.message);
            res.status(500).json({ error: 'Something went wrong' });
        }
    } else {
        // Handle any other HTTP method
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}

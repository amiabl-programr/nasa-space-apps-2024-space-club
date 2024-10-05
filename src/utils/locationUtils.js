// utils/locationUtils.js
import axios from 'axios';

const GOOGLE_MAPS_API_KEY = 'AIzaSyBXIJejsI6VkwWe7oo1OESdJb-HgV3ozpg'; // Replace with your Google Maps API key

export const latLongToAddress = async (latitude, longitude) => {
  const response = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${GOOGLE_MAPS_API_KEY}`);
  return response.data.results[0]?.formatted_address || 'Address not found';
};

export const countryToLatLong = async (country) => {
  const response = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${country}&key=${GOOGLE_MAPS_API_KEY}`);
  const location = response.data.results[0]?.geometry.location;
  return location ? { latitude: location.lat, longitude: location.lng } : null;
};

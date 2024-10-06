// utils/fetchCoordinates.js
export const fetchCoordinates = async (address) => {
    const response = await fetch(`/api/fetchCoordinates?address=${encodeURIComponent(address)}`);
  
    if (!response.ok) {
      throw new Error('Failed to fetch coordinates');
    }
  
    const data = await response.json();
  
    if (data.error) {
      throw new Error(data.error);
    }
  
    return { latitude: data.latitude, longitude: data.longitude };
  };
  
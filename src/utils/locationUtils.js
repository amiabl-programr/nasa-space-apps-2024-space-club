export const latLongToAddress = async (latitude, longitude) => {
  try {
    const response = await fetch(`/api/latLongToAddress?latitude=${latitude}&longitude=${longitude}`);
    const data = await response.json();
    return data.address || 'Address not found';
  } catch (error) {
    console.error('Error fetching address:', error);
    return 'Address not found';
  }
};


export const countryToLatLong = async (country) => {
  try {
    const response = await fetch(`/api/countryToLatLong?country=${encodeURIComponent(country)}`);
    const data = await response.json();
    return { latitude: data.latitude, longitude: data.longitude };
  } catch (error) {
    console.error('Error fetching coordinates:', error);
    return null;
  }
};

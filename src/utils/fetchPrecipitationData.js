export const fetchPrecipitationData = async (latitude, longitude) => {
  const response = await fetch(
    `https://power.larc.nasa.gov/api/temporal/daily/point?parameters=PRECTOT&&community=RE&longitude=${longitude}&latitude=${latitude}&start=20200101&end=20211231&format=JSON`
  );

  if (!response.ok) {
    throw new Error('Failed to fetch precipitation data');
  }

  const data = await response.json();

  // Check if the expected structure exists
  if (data && data.properties && data.properties.parameter && data.properties.parameter.PRECTOT) {
    const precipitationData = Object.entries(data.properties.parameter.PRECTOT).map(
      ([date, value]) => ({ date, value })
    );
    return precipitationData;
  } else {
    // Handle case where PRECTOT is not present
    console.error('Precipitation data is not available in the response:', data);
    return []; // Return an empty array if no data is found
  }
};

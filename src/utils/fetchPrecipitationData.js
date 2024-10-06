export const fetchPrecipitationData = async (latitude, longitude) => {
  const response = await fetch(
    `https://power.larc.nasa.gov/api/temporal/daily/point?parameters=PRECTOTCORR&&community=RE&longitude=${longitude}&latitude=${latitude}&start=20200101&end=20211231&format=JSON`
  );

  if (!response.ok) {
    throw new Error('Failed to fetch precipitation data');
  }

  const data = await response.json();

  // Check if PRECTOTCORR exists and process the data
  if (data && data.properties && data.properties.parameter && data.properties.parameter.PRECTOTCORR) {
    const precipitationData = Object.entries(data.properties.parameter.PRECTOTCORR).map(
      ([date, value]) => ({ date, value })
    );
    return precipitationData;
  } else {
    console.error('Precipitation data is not available in the response:', data);
    return []; // Return an empty array if no data is found
  }
};



// monthly data

// export const fetchPrecipitationData = async (latitude, longitude) => {
//   const response = await fetch(
//     `https://power.larc.nasa.gov/api/temporal/monthly/point?parameters=PRECTOTCORR&community=AG&longitude=${longitude}&latitude=${latitude}&start=2022&end=2022&format=JSON`
//   );

//   if (!response.ok) {
//     throw new Error('Failed to fetch precipitation data');
//   }

//   const data = await response.json();

//   // Convert data to a more usable format
//   const precipitationData = Object.entries(data.properties.parameter.PRECTOTCORR).map(
//     ([date, value]) => {
//       // Manually extract year and month from the YYYYMM format
//       const year = date.slice(0, 4);
//       const monthIndex = parseInt(date.slice(4, 6)) - 1; // Months are 0-indexed in JavaScript (0 = January)

//       // Get the month name
//       const monthName = new Date(year, monthIndex).toLocaleString('default', { month: 'long' });

//       return {
//         date: `${monthName} ${year}`, // e.g., "January 2022"
//         value
//       };
//     }
//   );

//   return precipitationData;
// };

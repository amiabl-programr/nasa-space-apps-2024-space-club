// pages/index.js
import { useEffect, useState } from 'react';
import TempFormWithChart from '@/components/tempChart';
import { fetchTemperatureData } from '@/utils/fetchTemperatureData';
import { latLongToAddress, countryToLatLong } from '../utils/locationUtils';
import { getUserLocation } from '@/utils/getUserLocation';

const Temperature = () => {
//   const [precipitationData, setPrecipitationData] = useState([]);
  const [address, setAddress] = useState('');

  useEffect(() => {
    const getPrecipitationData = async () => {
      const { latitude, longitude } = await getUserLocation(); // Implement user location fetching
      const address = await latLongToAddress(latitude, longitude);
      setAddress(address);
    };

    getPrecipitationData();
  }, []);

  return (
    <div>
      <h1>Precipitation Data</h1>
      <p>Location: {address}</p>
      <TempFormWithChart />
    </div>
  );
};

export default Temperature;

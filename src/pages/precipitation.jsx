// pages/index.js
import { useEffect, useState } from 'react';
import PrecipitationChart from '../components/PrecipitationChart';
import { fetchPrecipitationData } from '../utils/fetchPrecipitationData';
import { latLongToAddress, countryToLatLong } from '../utils/locationUtils';
import { getUserLocation } from '@/utils/getUserLocation';

const Home = () => {
  const [precipitationData, setPrecipitationData] = useState([]);
  const [address, setAddress] = useState('');

  useEffect(() => {
    const getPrecipitationData = async () => {
      const { latitude, longitude } = await getUserLocation(); // Implement user location fetching
      const data = await fetchPrecipitationData(latitude, longitude);
      setPrecipitationData(data);
      const address = await latLongToAddress(latitude, longitude);
      setAddress(address);
    };

    getPrecipitationData();
  }, []);

  return (
    <div>
      <h1>Precipitation Data</h1>
      <p>Location: {address}</p>
      <PrecipitationChart data={precipitationData} />
    </div>
  );
};

export default Home;

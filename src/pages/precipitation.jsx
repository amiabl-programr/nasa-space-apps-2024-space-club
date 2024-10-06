// pages/index.js
import { useEffect, useState } from 'react';
import PrecipitationChart from '../components/PrecipitationChart';
import { fetchPrecipitationData } from '../utils/fetchPrecipitationData';
import { latLongToAddress, countryToLatLong } from '../utils/locationUtils';
import { getUserLocation } from '@/utils/getUserLocation';
import Header from '@/components/header';

const Home = () => {
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

    <>
    <Header />
    <main>
      <h1>Precipitation Data</h1>
      <p>Location: {address}</p>
      <PrecipitationChart />
    </main>
    </>
  );
};

export default Home;

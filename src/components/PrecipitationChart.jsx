import { useState, useRef } from 'react';
import { Line } from 'react-chartjs-2';
import { fetchPrecipitationData } from '../utils/fetchPrecipitationData';
import { fetchCoordinates } from '@/utils/fetchCoordinates';

import {
  Chart as ChartJS,
  CategoryScale,  
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const PrecipitationFormWithChart = () => {
  const [temporalRange, setTemporalRange] = useState('monthly');
  const [address, setAddress] = useState('');
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');
  const [startYear, setStartYear] = useState('2022');
  const [endYear, setEndYear] = useState('2022');
  const [precipitationData, setPrecipitationData] = useState([]);
  const [chartData, setChartData] = useState(null);
  const [error, setError] = useState('');
  const chartRef = useRef(null); // Reference to the chart instance

  const handleAddressSubmit = async (e) => {
    e.preventDefault();
    try {
      const { latitude, longitude } = await fetchCoordinates(address);
      setLatitude(latitude);
      setLongitude(longitude);
      setError('');
    } catch (error) {
      console.error('Error fetching coordinates:', error);
      setError('Failed to fetch coordinates. Please check the address.');
    }
  };



  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!latitude || !longitude || !startYear || !endYear) {
      setError('Please fill in all fields');
      return;
    }

    try {
      const data = await fetchPrecipitationData(latitude, longitude, temporalRange, startYear, endYear);
      setPrecipitationData(data);

      const chartLabels = data.map(item => item.date);
      const chartValues = data.map(item => item.value);
      
      setChartData({
        labels: chartLabels,
        datasets: [
          {
            label: 'Precipitation (mm)',
            data: chartValues,
            fill: false,
            borderColor: 'rgb(75, 192, 192)',
            tension: 0.1,
          },
        ],
      });
      setError('');
    } catch (error) {
      console.error('Error fetching data:', error);
      setError('Failed to fetch precipitation data. Please check the input values.');
    }
  };

  const downloadCSV = () => {
    if (!chartData) return;

    const csvRows = [
      ['Date', 'Precipitation (mm)'], // Header
      ...precipitationData.map(item => [item.date, item.value]), // Data rows
    ];

    const csvContent = csvRows.map(row => row.join(',')).join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.setAttribute('download', `precipitation_data_${latitude}_${longitude}.csv`);
    link.click();
  };

  const downloadImage = () => {
    const chart = chartRef.current;

    if (!chart) return;

    const imageURL = chart.toBase64Image(); // Convert chart to image (base64)
    const link = document.createElement('a');
    link.href = imageURL;
    link.download = `precipitation_chart_${latitude}_${longitude}.png`; // Specify download format (e.g., PNG)
    link.click();
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold text-center mb-4">Precipitation Data</h1>
      <form onSubmit={handleAddressSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Enter Farm Address:</label>
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Get Coordinates
        </button>
      </form>

      {latitude && longitude && (
        <div className="text-center mb-4">
          <p>Latitude: {latitude}</p>
          <p>Longitude: {longitude}</p>
        </div>
      )}

      
      
      
      
      <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Latitude:</label>
          <input
            type="number"
            value={latitude}
            onChange={(e) => setLatitude(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Longitude:</label>
          <input
            type="number"
            value={longitude}
            onChange={(e) => setLongitude(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Start Year:</label>
          <input
            type="text"
            value={startYear}
            onChange={(e) => setStartYear(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">End Year:</label>
          <input
            type="text"
            value={endYear}
            onChange={(e) => setEndYear(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Temporal Range:</label>
          <select
            value={temporalRange}
            onChange={(e) => setTemporalRange(e.target.value)}
            className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
          >
            <option value="daily">Daily</option>
            <option value="monthly">Monthly</option>
            <option value="annual">Annual</option>
            <option value="hourly">Hourly</option>
          </select>
        </div>
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Fetch Data
        </button>
      </form>

      {error && <p className="text-red-500 text-center">{error}</p>}

      {chartData && (
        <div className="chart-container mt-8">
          <h2 className="text-xl font-bold mb-4">Precipitation Chart</h2>
          <Line data={chartData} ref={chartRef} />

          <div className="mt-4">
            <button
              onClick={downloadCSV}
              className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mr-4"
            >
              Download CSV
            </button>

            <button
              onClick={downloadImage}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Download Chart as Image
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PrecipitationFormWithChart;

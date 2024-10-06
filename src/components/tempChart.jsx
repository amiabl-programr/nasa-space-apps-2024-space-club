import { useState } from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,  // Import CategoryScale
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { fetchTemperatureData } from '@/utils/fetchTemperatureData';

// Register the necessary components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const TempFormWithChart = () => {
  const [temporalRange, setTemporalRange] = useState('monthly');
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');
  const [startYear, setStartYear] = useState('2022');
  const [endYear, setEndYear] = useState('2022');
  const [precipitationData, setPrecipitationData] = useState([]);
  const [chartData, setChartData] = useState(null);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Submitting:', {
      latitude,
      longitude,
      temporalRange,
      startYear,
      endYear,
    });

    // Input validation
    if (!latitude || !longitude || !startYear || !endYear) {
      setError('Please fill in all fields');
      return;
    }

    try {
      const data = await fetchTemperatureData(latitude, longitude, temporalRange, startYear, endYear);
      setPrecipitationData(data);
      
      // Prepare data for the chart
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
      setError(''); // Clear any previous errors
    } catch (error) {
      console.error('Error fetching data:', error);
      setError('Failed to fetch precipitation data. Please check the input values.');
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold text-center mb-4">Precipitation Data</h1>
      <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Latitude:</label>
          <input
            type="number" // Changed to number for better validation
            value={latitude}
            onChange={(e) => setLatitude(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Longitude:</label>
          <input
            type="number" // Changed to number for better validation
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

      {/* Display error message if any */}
      {error && <p className="text-red-500 text-center">{error}</p>}

      {/* Display the chart if data is available */}
      {chartData && (
        <div className="chart-container mt-8">
          <h2 className="text-xl font-bold mb-4">Precipitation Chart</h2>
          <Line data={chartData} />
        </div>
      )}
    </div>
  );
};

export default TempFormWithChart;

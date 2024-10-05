// components/PrecipitationChart.js
import { Chart, CategoryScale, LinearScale, PointElement, LineElement, LineController, Title, Tooltip, Legend } from 'chart.js';
import { Line } from 'react-chartjs-2';

// Register the necessary components from Chart.js
Chart.register(CategoryScale, LinearScale, PointElement, LineElement, LineController, Title, Tooltip, Legend);

const PrecipitationChart = ({ data }) => {
  const chartData = {
    labels: data.map(item => item.date), // Ensure you map the correct data
    datasets: [
      {
        label: 'Precipitation (mm)',
        data: data.map(item => item.value), // Adjust based on your data structure
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
      },
    ],
  };
  if (!data || data.length === 0) {
    return <div>No data available</div>;
  }
  
  return <Line data={chartData} />;
};

export default PrecipitationChart;

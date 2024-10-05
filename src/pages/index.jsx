import Link from 'next/link';
import Image from 'next/image';

const Home = () => (
  <>
    <header className='flex justify-between items-center py-3 px-4 bg-gray-100'>
      <div className='flex items-center'>
        {/* Replace with your logo */}
        <Image src="" alt="Logo" className="w-12 h-12 mr-2" />
        <span className="text-xl font-semibold">FarmYield</span>
      </div>

      <nav className='space-x-4'>
        <Link  href="/precipitation" className="text-gray-700 hover:text-blue-500">
          Precipitation
        </Link>
        <Link href="/soil-moisture" className="text-gray-700 hover:text-blue-500">
         Soil Moisture
        </Link>
        <Link href="/soil-assessment" className="text-white bg-blue-500 py-2 px-4 rounded-lg hover:bg-blue-600">
          Start Soil Assessment
        </Link>
      </nav>
    </header>

    <main className="py-10 px-4 text-center">
      <h1 className="text-4xl font-bold text-gray-800 mb-6">
        Optimize Your Farming with Data-Driven Insights
      </h1>
      <p className="text-lg text-gray-600 mb-10">
        Use real-time and historical data to assess your soil quality and get personalized recommendations for improved crop yield.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-xl font-bold mb-4">Track Precipitation</h2>
          <p className="text-gray-600">
            View the precipitation levels over time in your area to better plan your irrigation schedule.
          </p>
        </div>
        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-xl font-bold mb-4">Monitor Soil Moisture</h2>
          <p className="text-gray-600">
            Assess the moisture levels of your soil and ensure the optimal environment for your crops.
          </p>
        </div>
        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-xl font-bold mb-4">Start Soil Assessment</h2>
          <p className="text-gray-600">
            Get a detailed report on your soil’s quality and receive actionable advice on improving crop yield.
          </p>
        </div>
      </div>
    </main>

    <footer className="py-4 text-center bg-gray-100">
      <p className="text-gray-600">&copy; 2024 FarmYield. All rights reserved.</p>
    </footer>
  </>
);

export default Home;

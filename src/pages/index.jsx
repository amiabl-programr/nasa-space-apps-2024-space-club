import Link from 'next/link';
import Image from 'next/image';
import Header from '@/components/header';

const Home = () => (
<>
    <Header />

    <main className="py-10 px-4 text-center">
        <h1 className="text-4xl font-bold text-gray-800 mb-6">
            Optimize Your Farming with Data-Driven Insights
        </h1>
        <p className="text-lg text-gray-600 mb-10">
            Use real-time and historical data to assess your soil quality and get personalized recommendations for
            improved crop yield.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            <div className="bg-white shadow-md rounded-lg p-6">
                <h2 className="text-xl font-bold mb-4">
                <Link href="/precipitation">
                    Track Precipitation 
                    
                    </Link> </h2>
                <p className="text-gray-600">
                    View the precipitation levels over time in your area to better plan your irrigation schedule.
                </p>
            </div>
            <div className="bg-white shadow-md rounded-lg p-6">
                <h2 className="text-xl font-bold mb-4">
                    <Link href="/temperature">
                    Track Temperature 
                    
                    </Link>
                    </h2>
                <p className="text-gray-600">
                    View the temperature levels over time in your area
                </p>
            </div>
            <div className="bg-white shadow-md rounded-lg p-6">
                <h2 className="text-xl font-bold mb-4">
                <Link href="/soil-assessment">
                Start Soil Assessment
                    
                    </Link></h2>
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

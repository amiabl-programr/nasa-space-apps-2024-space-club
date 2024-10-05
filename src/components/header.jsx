import Link from "next/link"; 
import Image from "next/image";

const Header =()=>{
return (
<>
    <header className='flex justify-between items-center py-3 px-4 bg-gray-100'>
        <div className='flex items-center'>
            {/* Replace with your logo */}
            <Image alt="Logo" className="w-12 h-12 mr-2" src="" />
            <span className="text-xl font-semibold">FarmYield</span>
        </div>

        <nav className='space-x-4'>
            <Link  className="text-gray-700 hover:text-blue-500" href="/precipitation">
                Precipitation
            </Link>
            <Link className="text-gray-700 hover:text-blue-500" href="/soil-moisture">
                Soil Moisture
            </Link>
            <Link className="text-white bg-blue-500 py-2 px-4 rounded-lg hover:bg-blue-600" href="/soil-assessment">
                Start Soil Assessment
            </Link>
        </nav>
    </header>
</>
)
}

export default Header;

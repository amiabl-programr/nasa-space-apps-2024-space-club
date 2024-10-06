import Link from "next/link";
import { useState } from 'react';


function Header() {
    const [isOpen, setIsOpen] = useState(false);
    // Initialize the state for the mobile menu

    return (
        <header className="bg-green-600 shadow-md">
            <div className="container mx-auto px-4 py-4
       flex justify-between items-center">
                <div className="text-xl font-bold text-white">Farm Yield</div>
                <nav className="hidden md:flex space-x-4 ml-5 mr-5">
                    
                    <Link href="/precipitation" className="flex items-center
           text-white font-bold">
                         Precipitation
                    </Link>
                    <Link href="#" className="flex items-center
           text-white font-bold">
                        Temperature
                    </Link>
                    <Link href="/soil-assessment" className="flex items-center
           text-white font-bold">
                    Soil Assessment
                    </Link>
                
                </nav>
                <div className="md:hidden">
                    <button onClick={() => setIsOpen(!isOpen)} className="text-white">
                        =
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
                <nav className="md:hidden bg-green-600 p-4
         space-y-2 ml-2 mr-2">
                    <Link href="/precipitation" className="flex items-center
           text-white font-bold">
                         Precipitation
                    </Link>
                    <Link href="#" className="flex items-center
           text-white font-bold">
                        Temperature
                    </Link>
                    <Link href="/soil-assessment" className="flex items-center
           text-white font-bold">
                    Soil Assessment
                    </Link>
                </nav>
            )}
        </header>
    );
}

export default Header;
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import TVClogo from '../Photos/TVClogo.png';
import ifsmall from '../Photos/IFsmall.png';
const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);


    const leftLinks = [
        { name: 'Home', path: '/' },

        { name: 'Submitted Resume', path: '/submit-resume' },
        { name: 'About Us', path: '/agenda' },

    ];

    const rightLinks = [
        { name: 'Company Dashboard', path: '/company' },
        // { name: 'Speakers', path: '/speaker' },
        { name: 'Contact us', path: '/contactus' },
    ];


    return (
        <nav className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-b from-blue-900/70 to-blue-900/0 backdrop-blur-sm text-white shadow-md">
            <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-14">

                {/* Navbar Container */}
                <div className="flex justify-between items-center h-20 sm:h-24">

                    {/* Register Button (Left in Mobile) */}
                    <div className="sm:hidden">
                        <Link
                            to="/register"
                            className="text-white bg-cyan-600/80 hover:bg-cyan-500/90 font-medium py-2 px-4 text-lg rounded-lg transition-colors"
                        >
                            Register
                        </Link>
                    </div>

                    {/* Centered Logo */}
                    <div className="flex-1 flex justify-center">
                        <img src={TVClogo} alt="Logo" className="h-16 w-auto sm:h-20" />
                    </div>

                    {/* Mobile menu button (Right) */}
                    <div className="sm:hidden">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="text-white p-2"
                        >
                            {isOpen ? <X size={28} /> : <Menu size={28} />}
                        </button>
                    </div>

                    {/* Desktop Navbar Links (Centered) */}
                    <div className="hidden sm:flex items-center flex-grow justify-center gap-x-12">
                        {leftLinks.map(({ name, path }) => (
                            <Link
                                key={name}
                                to={path}
                                className="text-gray-200 hover:text-white font-medium text-lg transition-colors"
                            >
                                {name}
                            </Link>
                        ))}
                        <img src={ifsmall} alt="Logo" className="h-20 w-auto" />
                        {rightLinks.map(({ name, path }) => (
                            <Link
                                key={name}
                                to={path}
                                className="text-gray-200 hover:text-white font-medium text-lg transition-colors"
                            >
                                {name}
                            </Link>
                        ))}
                    </div>

                    {/* Register Button (Desktop - Right) */}
                    <div className="hidden sm:block">
                        <Link
                            to="/register"
                            className="text-white bg-cyan-600/80 hover:bg-cyan-500/90 font-medium py-3 px-8 text-lg rounded-lg transition-colors"
                        >
                            Register
                        </Link>
                    </div>

                </div>
            </div>

            {/* Mobile menu */}
            {isOpen && (
                <div className="sm:hidden bg-blue-900/90 backdrop-blur-sm border-t border-gray-700/30">
                    <div className="px-4 pt-3 pb-4 space-y-2">
                        {[...leftLinks, ...rightLinks].map(({ name, path }) => (
                            <Link
                                key={name}
                                to={path}
                                className="block px-4 py-3 text-gray-200 hover:bg-blue-800/70 hover:text-white rounded-md transition-colors text-lg"
                                onClick={() => setIsOpen(false)}
                            >
                                {name}
                            </Link>
                        ))}
                        {/* Register Button in Mobile View */}
                        <Link
                            to="/register"
                            className="block px-4 py-3 text-white bg-cyan-600/80 hover:bg-cyan-500/90 rounded-md transition-colors text-lg"
                            onClick={() => setIsOpen(false)}
                        >
                            Register
                        </Link>
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;

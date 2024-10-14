import React from 'react';
import { Link } from 'react-router-dom';

const NotFoundPage: React.FC = () => {
    return (
        <main className="h-screen w-full flex flex-col justify-center items-center relative">
            {/* Background setup similar to Home page */}
            <div aria-hidden="true" className="absolute inset-0 bg-hero-pattern bg-cover bg-center"></div>
            <div aria-hidden="true" className="absolute inset-0 bg-black opacity-60"></div>

            {/* Content */}
            <h1 className="text-[15rem] font-extrabold text-white tracking-widest z-10">404</h1>
            <div className="bg-[#FF6A3D] px-4 py-2 text-xl sm:text-1xl lg:text-3xl font-bold rounded rotate-12 absolute z-10">
                Page Not Found
            </div>
            <button className="mt-5 z-10">
                <a
                    className="inline-block px-6 py-3 text-sm font-semibold text-white bg-[#FF6A3D] rounded-full hover:bg-[#e65b2f] focus:outline-none focus:ring"
                >
                    <Link to="/home">Go Home</Link>
                </a>
            </button>
        </main>
    );
};

export default NotFoundPage;

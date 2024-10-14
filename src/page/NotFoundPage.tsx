import React from 'react';
import { Link } from 'react-router-dom';

const NotFound: React.FC = () => {
    return (
        <main className="h-screen w-full flex flex-col justify-center items-center bg-[#1A2238] relative">
            {/* Background image */}
            <div
                className="absolute inset-0 bg-cover bg-center opacity-60"
                style={{
                    backgroundImage: "url('public/bg-2.jpg')", // Đường dẫn tới ảnh nền
                }}
            ></div>

            {/* Content */}
            <h1 className="text-[15rem] font-extrabold text-white tracking-widest z-10">404</h1>
            <div className="bg-[#FF6A3D] px-4 py-2 text-xl sm:text-1xl lg:text-3xl font-bold rounded rotate-12 absolute z-10">
                Page Not Found
            </div>
            <button className="mt-5 z-10">
                <a
                    className="relative inline-block text-sm font-medium text-[#FF6A3D] group active:text-orange-500 focus:outline-none focus:ring"
                >
                    <span className="absolute inset-0 transition-transform translate-x-0.5 translate-y-0.5 bg-[#FF6A3D] group-hover:translate-y-0 group-hover:translate-x-0"></span>

                    <span className="relative block px-8 py-3 bg-[#1A2238] border border-current">
                        <Link to="/home">Go Home</Link>
                    </span>
                </a>
            </button>
        </main>
    );
};

export default NotFound;

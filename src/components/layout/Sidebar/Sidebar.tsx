import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

interface SideBarProps {
    onToggle: (isOpen: boolean) => void;
}

const SideBar: React.FC<SideBarProps> = ({ onToggle }) => {
    const [isOpen, setIsOpen] = useState(true);

    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };

    useEffect(() => {
        onToggle(isOpen);
    }, [isOpen, onToggle]);

    return (
        <>
            <button
                onClick={toggleSidebar}
                className="p-2 m-2 text-gray-600 rounded-md fixed top-2 left-2 z-50"
            >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-8 h-8">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                </svg>
            </button>
            <aside
                className={`fixed top-0 left-0 z-40 w-64 h-screen bg-gray-900 text-white transition-transform duration-300 ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}
                aria-label="Sidebar"
            >
                <div className="h-full px-3 py-4 overflow-y-auto">
                    <div className="flex flex-col items-center pb-4">
                        <img
                            className="w-16 h-16 mb-3 rounded-full shadow-lg"
                            src="https://png.pngtree.com/png-vector/20190118/ourmid/pngtree-user-vector-icon-png-image_328702.jpg"
                            alt="Profile"
                        />
                        <h2 className="text-xl font-bold">ADMIN</h2>
                        {/* <p className="text-sm text-gray-400">VP Fancy Admin</p> */}
                    </div>
                    <ul className="space-y-2">
                        <li>
                            <Link
                                to="#"
                                className="flex items-center p-2 text-gray-300 rounded-lg hover:bg-gray-700 group"
                            >
                                <svg
                                    className="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                                    aria-hidden="true"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="currentColor"
                                    viewBox="0 0 22 21"
                                >
                                    <path d="M16.975 11H10V4.025a1 1 0 0 0-1.066-.998 8.5 8.5 0 1 0 9.039 9.039.999.999 0 0 0-1-1.066h.002Z" />
                                    <path d="M12.5 0c-.157 0-.311.01-.565.027A1 1 0 0 0 11 1.02V10h8.975a1 1 0 0 0 1-.935c.013-.188.028-.374.028-.565A8.51 8.51 0 0 0 12.5 0Z" />
                                </svg>
                                <span className="ml-3">Dashboard</span>
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/service-management"
                                className="flex items-center p-2 text-gray-300 rounded-lg hover:bg-gray-700 group"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12a7.5 7.5 0 0 0 15 0m-15 0a7.5 7.5 0 1 1 15 0m-15 0H3m16.5 0H21m-1.5 0H12m-8.457 3.077 1.41-.513m14.095-5.13 1.41-.513M5.106 17.785l1.15-.964m11.49-9.642 1.149-.964M7.501 19.795l.75-1.3m7.5-12.99.75-1.3m-6.063 16.658.26-1.477m2.605-14.772.26-1.477m0 17.726-.26-1.477M10.698 4.614l-.26-1.477M16.5 19.794l-.75-1.299M7.5 4.205 12 12m6.894 5.785-1.149-.964M6.256 7.178l-1.15-.964m15.352 8.864-1.41-.513M4.954 9.435l-1.41-.514M12.002 12l-3.75 6.495" />
                                </svg>
                                <span className="ml-3">Service</span>
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/stylist-management"
                                className="flex items-center p-2 text-gray-300 rounded-lg hover:bg-gray-700 group"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="m7.848 8.25 1.536.887M7.848 8.25a3 3 0 1 1-5.196-3 3 3 0 0 1 5.196 3Zm1.536.887a2.165 2.165 0 0 1 1.083 1.839c.005.351.054.695.14 1.024M9.384 9.137l2.077 1.199M7.848 15.75l1.536-.887m-1.536.887a3 3 0 1 1-5.196 3 3 3 0 0 1 5.196-3Zm1.536-.887a2.165 2.165 0 0 0 1.083-1.838c.005-.352.054-.695.14-1.025m-1.223 2.863 2.077-1.199m0-3.328a4.323 4.323 0 0 1 2.068-1.379l5.325-1.628a4.5 4.5 0 0 1 2.48-.044l.803.215-7.794 4.5m-2.882-1.664A4.33 4.33 0 0 0 10.607 12m3.736 0 7.794 4.5-.802.215a4.5 4.5 0 0 1-2.48-.043l-5.326-1.629a4.324 4.324 0 0 1-2.068-1.379M14.343 12l-2.882 1.664" />
                                </svg>

                                <span className="ml-3">Stylist</span>
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="#"
                                className="flex items-center p-2 text-gray-300 rounded-lg hover:bg-gray-700 group"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z" />
                                </svg>

                                <span className="ml-3">Users</span>
                            </Link>
                        </li>
                    </ul>
                </div>
            </aside>
        </>
    );
};

export default SideBar;

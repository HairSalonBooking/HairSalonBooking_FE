import { logoutUser } from '@/services/features/auth/authSlice';
import { useAppDispatch } from '@/services/store/store';
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';



interface SideBarStylistProps {
    onToggle: (isOpen: boolean) => void;
}

const SideBarStylist: React.FC<SideBarStylistProps> = ({ onToggle }) => {
    const dispatch = useAppDispatch();
    const [isOpen, setIsOpen] = useState(true);
    const navigate = useNavigate();


    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };

    const handleLogout = () => {
        dispatch(logoutUser());
        navigate("/login");
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
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="w-8 h-8"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                    />
                </svg>
            </button>
            <aside
                className={`fixed top-0 left-0 z-40 w-64 h-screen bg-gray-900 text-white transition-transform duration-300 ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}
                aria-label="Sidebar"
            >
                <div className="h-full flex flex-col justify-between px-3 py-4 overflow-y-auto">
                    <div>
                        <div className="flex flex-col items-center pb-4">
                            <img
                                className="w-16 h-16 mb-3 rounded-full shadow-lg"
                                src="https://www.svgrepo.com/show/301043/employee-worker.svg"
                                alt="Profile"
                            />
                            <h2 className="text-xl font-bold">Stylist</h2>
                        </div>
                        <ul className="space-y-2">
                            <li>
                                <Link
                                    to="/shift-stylist"
                                    className="flex items-center p-2 text-gray-300 rounded-lg hover:bg-gray-700 group"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M12 7.5h1.5m-1.5 3h1.5m-7.5 3h7.5m-7.5 3h7.5m3-9h3.375c.621 0 1.125.504 1.125 1.125V18a2.25 2.25 0 0 1-2.25 2.25M16.5 7.5V18a2.25 2.25 0 0 0 2.25 2.25M16.5 7.5V4.875c0-.621-.504-1.125-1.125-1.125H4.125C3.504 3.75 3 4.254 3 4.875V18a2.25 2.25 0 0 0 2.25 2.25h13.5M6 7.5h3v3H6v-3Z" />
                                    </svg>

                                    <span className="ml-3">Shift</span>
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="/salary-stylist"
                                    className="flex items-center p-2 text-gray-300 rounded-lg hover:bg-gray-700 group"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 0 0 2.25-2.25V6.75A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25v10.5A2.25 2.25 0 0 0 4.5 19.5Z" />
                                    </svg>

                                    <span className="ml-3">Salary</span>
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="/profile"
                                    className="flex items-center p-2 text-gray-300 rounded-lg hover:bg-gray-700 group"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M15 9h3.75M15 12h3.75M15 15h3.75M4.5 19.5h15a2.25 2.25 0 0 0 2.25-2.25V6.75A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25v10.5A2.25 2.25 0 0 0 4.5 19.5Zm6-10.125a1.875 1.875 0 1 1-3.75 0 1.875 1.875 0 0 1 3.75 0Zm1.294 6.336a6.721 6.721 0 0 1-3.17.789 6.721 6.721 0 0 1-3.168-.789 3.376 3.376 0 0 1 6.338 0Z" />
                                    </svg>

                                    <span className="ml-3">Profile Stylist</span>
                                </Link>
                            </li>

                        </ul>
                    </div>
                    <button
                        onClick={handleLogout}
                        className="flex items-center w-full p-2 text-gray-300 rounded-lg hover:bg-gray-700 group"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            stroke="currentColor"
                            className="w-6 h-6 text-gray-500 transition duration-75 group-hover:text-white"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M8.25 9V5.25A2.25 2.25 0 0 1 10.5 3h6a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 16.5 21h-6a2.25 2.25 0 0 1-2.25-2.25V15m-3 0-3-3m0 0 3-3m-3 3H15"
                            />
                        </svg>
                        <span className="ml-3">Logout</span>
                    </button>
                </div>
            </aside>
        </>
    );
};

export default SideBarStylist;

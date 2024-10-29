import { logoutUser } from "@/services/features/auth/authSlice";
import { useAppDispatch, useAppSelector } from "@/services/store/store";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaStar } from "react-icons/fa"; // Import an icon, for example, a star icon
import { getUserPointById } from "@/services/features/user/userSlice";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { auth } = useAppSelector((state) => state.auth);
  const { user } = useAppSelector((state) => state.users);

  const handleLogout = () => {
    dispatch(logoutUser());
    navigate("/login");
  };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  // Fetch user points when the component mounts or auth changes
  useEffect(() => {
    if (auth?.id !== undefined) {
      dispatch(getUserPointById({ id: auth.id }));
    }
  }, [dispatch, auth?.id]);


  return (
    <header>
      <nav className="absolute z-10 w-full px-64">
        <div className="relative flex items-center justify-between gap-6 py-2 md:gap-0 md:py-4">
          {/* Logo */}
          <a href="/home" aria-label="logo" className="flex items-center space-x-2">
            <span className="text-2xl font-bold text-white dark:text-white">HairSalon</span>
          </a>

          {/* Right Section */}
          <div className="flex items-center space-x-8 ml-auto">
            <ul className="flex space-x-6 font-medium text-white">
              <li><a href="/services" className="hover:text-yellow-700">Service</a></li>
              <li><a href="/about" className="hover:text-yellow-700">About</a></li>
              <li><a href="/contact" className="hover:text-yellow-700">Contact</a></li>
            </ul>

            {!auth ? (
              <Link
                to="/login"
                className="relative flex h-9 w-full items-center justify-center px-4 before:absolute before:inset-0 before:rounded-full before:bg-yellow-600 before:transition before:duration-300 hover:before:scale-105 active:duration-75 active:before:scale-95 sm:w-max"
              >
                <span className="relative text-sm font-semibold text-white">Login</span>
              </Link>
            ) : (
              <div className="relative">
                <div className="flex items-center gap-2">
                  <button
                    onClick={toggleDropdown}
                    className="relative flex h-9 w-full items-center justify-center px-4 before:absolute before:inset-0 before:rounded-full before:bg-yellow-600 before:transition before:duration-300 hover:before:scale-105 active:duration-75 active:before:scale-95 sm:w-max"
                  >
                    <span className="relative text-ellipsis font-semibold text-white">Hello, {auth?.lastName}</span>
                    <svg
                      className={`w-4 h-4 ml-2 transition-transform transform ${dropdownOpen ? "rotate-180" : "rotate-0"}`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                    </svg>
                  </button>

                  {/* Custom Point Display */}
                  <div className="flex items-center text-yellow-500 bg-gray-800 px-3 py-1 rounded-full hover:bg-yellow-600 transition duration-300">
                    <FaStar className="mr-1" /> {/* Star icon */}
                    <span className="text-sm font-semibold">{user?.points} Points</span>
                  </div>
                </div>
                {dropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10">
                    <Link to="/profile" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">
                      View Profile
                    </Link>
                    <Link to="/order-history" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">
                      View Booking
                    </Link>
                    <button onClick={handleLogout} className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100">
                      Logout
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;

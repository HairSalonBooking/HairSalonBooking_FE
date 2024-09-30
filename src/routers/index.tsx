
import LoginPage from '@/page/auth/Login/LoginPage'
import RegisterPage from '@/page/auth/Register/RegisterPage'
import { Navigate, Route, Routes } from 'react-router-dom'
import ForgotPassWordPage from '@/page/auth/ForgotPassWord/ForgotPassWordPage'
import { useAppSelector } from '@/services/store/store'
import Home from '@/page/customer/home/HomePage'
import Profile from '@/page/customer/User/UserProfilePage'
import BookingPage from '@/page/customer/Booking/BookingPage'
import AboutPage from '@/page/customer/AboutPage'

const AppRouter = () => {
    const token = sessionStorage.getItem("hairSalonToken");
    const { auth } = useAppSelector((state) => state.auth);
    const isCustomer = auth?.roleId === "R4"
    return (
        <Routes>
            {token === null ? (
                <>
                    <Route path='/login' element={<LoginPage />} />
                    <Route path='/register' element={<RegisterPage />} />
                    <Route path='/forgot_password' element={<ForgotPassWordPage />} />
                    <Route path='/profile' element={<Profile />} />
                    <Route path='/booking' element={<BookingPage />} />
                    <Route path='/about' element={<AboutPage />} />
                    <Route path="*" element={<Navigate to="/" replace />} />
                    <Route path='/' element={<Home />} />

                </>
            ) : (
                <>
                    <Route path='/profile' element={<Profile />} />
                    {isCustomer && (

                        <>
                            <Route path='/home' element={<Home />} />

                        </>
                    )}
                </>
            )}

        </Routes>
    )
}
export default AppRouter
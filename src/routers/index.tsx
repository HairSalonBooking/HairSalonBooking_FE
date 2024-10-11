
import LoginPage from '@/page/auth/Login/LoginPage'
import RegisterPage from '@/page/auth/Register/RegisterPage'
import { Navigate, Route, Routes } from 'react-router-dom'
import ForgotPassWordPage from '@/page/auth/ForgotPassWord/ForgotPassWordPage'
import { useAppSelector } from '@/services/store/store'
import Home from '@/page/customer/home/HomePage'
import Profile from '@/page/customer/user/UserProfilePage'
import BookingPage from '@/page/customer/booking/BookingPage'
import AboutPage from '@/page/customer/AboutPage'
import ServicePage from '@/page/customer/service/ServicePage'
import ContactPage from '@/page/customer/ContactPage'
import ResetPasswordPage from '@/page/auth/ResetPassWord/ResetPasswordPage'
import ServiceManagement from '@/page/admin/ServiceManagement/ServiceManagement'
import StylistManagement from '@/page/admin/ServiceManagement/StylistManagement'
import ServiceDetailPage from '@/page/customer/service/ServiceDetailPage'

const AppRouter = () => {
    const token = sessionStorage.getItem("hairSalonToken");
    const { auth } = useAppSelector((state) => state.auth);
    const isCustomer = auth?.roleId === "R4"
    const isAdmin = auth?.roleId === "R2"
    return (
        <Routes>
            {token === null ? (
                <>

                    <Route path='/login' element={<LoginPage />} />
                    <Route path='/register' element={<RegisterPage />} />
                    <Route path='/forgot-password' element={<ForgotPassWordPage />} />
                    <Route path='/reset-password/:token' element={<ResetPasswordPage />} />
                    <Route path='/booking' element={<BookingPage />} />
                    <Route path='/about' element={<AboutPage />} />
                    <Route path='/services' element={<ServicePage />} />
                    <Route path='/services/:id' element={<ServiceDetailPage />} />
                    <Route path='/contact' element={<ContactPage />} />
                    <Route path="*" element={<Navigate to="/home" replace />} />
                    <Route path='/home' element={<Home />} />
                    <Route path='/service-management' element={<ServiceManagement />} />
                    <Route path='/stylist-management' element={<StylistManagement />} />



                </>
            ) : (
                <>
                    <Route path='/profile' element={<Profile />} />
                    <Route path='/booking' element={<BookingPage />} />
                    <Route path='/about' element={<AboutPage />} />
                    <Route path='/services' element={<ServicePage />} />
                    <Route path='/contact' element={<ContactPage />} />
                    <Route path='/about' element={<AboutPage />} />


                    {isCustomer && (

                        <>
                            <Route path='/profile' element={<Profile />} />
                            <Route path='/home' element={<Home />} />

                        </>
                    )}
                    {isAdmin && (

                        <>
                            <Route path='/profile' element={<Profile />} />
                            <Route path='/service-management' element={<ServiceManagement />} />
                            <Route path='/stylist-management' element={<StylistManagement />} />


                        </>
                    )}
                </>
            )}

        </Routes>
    )
}
export default AppRouter
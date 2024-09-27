import Home from '@/page/customer/home/Homepage'
import LoginPage from '@/page/auth/Login/LoginPage'
import RegisterPage from '@/page/auth/Register/RegisterPage'
import { Navigate, Route, Routes } from 'react-router-dom'
import ForgotPassWordPage from '@/page/auth/ForgotPassWord/ForgotPassWordPage'
import Profile from '@/page/customer/home/Profilepage'
import { useAppSelector } from '@/services/store/store'
const AppRouter = () => {
    const token = sessionStorage.getItem("hairSalon");
    const { auth } = useAppSelector((state) => state.auth);
    const isCustomer = auth?.roleId === "R4"
    return (
        <Routes>
            {token === null ? (
                <>
                    <Route path='/login' element={<LoginPage />} />
                    <Route path='/register' element={<RegisterPage />} />
                    <Route path='/forgot_password' element={<ForgotPassWordPage />} />
                    <Route path="*" element={<Navigate to="/" replace />} />
                    <Route path='/' element={<Home />} />
                </>
            ) : (
                <>
                    <Route path='/profile' element={<Profile />} />
                    {isCustomer && (
                        <>
                            <Route path='/' element={<Home />} />
                        </>
                    )}
                </>
            )}

        </Routes>
    )
}
export default AppRouter
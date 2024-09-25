import LoginPage from '@/page/auth/Login/LoginPage'
import RegisterPage from '@/page/auth/Register/RegisterPage'
import { Navigate, Route, Routes } from 'react-router-dom'
import ForgotPassWordPage from '@/page/auth/ForgotPassWord/ForgotPassWordPage'
import Home from '@/page/customer/home/Homepage'

const AppRouter = () => {
    const token = sessionStorage.getItem("hairSalon")
    return (
        <Routes>
            {token === null ? (
                <>
                    <Route path='/login' element={<LoginPage />} />
                    <Route path='/register' element={<RegisterPage />} />
                    <Route path='/forgot_password' element={<ForgotPassWordPage />} />
                    <Route path="*" element={<Navigate to="/login" replace />} />
                </>
            ) : (
                <>
                    <Route path='/' element={<Home />} />
                    <Route path="*" element={<Navigate to="/" replace />} />
                </>
            )}
        </Routes>
    )
}

export default AppRouter;
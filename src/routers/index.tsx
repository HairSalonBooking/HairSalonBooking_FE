import ForgotPasswordForm from '@/components/authentication/ForgotPasswordForm'
import Home from '@/page/customer/home/Homepage'
import LoginPage from '@/page/customer/Login/LoginPage'
import RegisterPage from '@/page/customer/Register/RegisterPage'
import { Navigate, Route, Routes } from 'react-router-dom'
const AppRouter = () => {
    const token = sessionStorage.getItem("hairSalon")
    return (
        <Routes>
            {token === null ? (
                <>
                    <Route path='/login' element={<LoginPage />} />
                    <Route path='/register' element={<RegisterPage />} />
                    <Route path='/forgot_password' element={<ForgotPasswordForm />} />
                    <Route path="*" element={<Navigate to="/" replace />} />
                    <Route path='/' element={<Home />} />
                </>
            ) : (
                <>
                </>
            )}

        </Routes>
    )
}
export default AppRouter
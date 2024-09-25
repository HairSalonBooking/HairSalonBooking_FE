import ForgotPassWordPage from "@/page/Auth/ForgotPassWord/ForgotPassWordPage"
import LoginPage from "@/page/Auth/Login/LoginPage"
import RegisterPage from "@/page/Auth/Register/RegisterPage"
import Home from "@/page/customer/home/Homepage"
import { Navigate, Route, Routes } from "react-router-dom"

const AppRouter = () => {
    const token = sessionStorage.getItem("hairSalon")
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
                </>
            )}

        </Routes>
    )
}
export default AppRouter

import axios from 'axios';
import { BASE_URL } from './apiConfig';
import { toast } from 'react-toastify';
// Import store and actions only when needed
let store: any;
let refreshAccessToken: any;
let logoutUser: any;

// Initialize axios instance
const axiosInstance = axios.create({
    baseURL: BASE_URL
});

axiosInstance.interceptors.request.use(
    (config) => {
        const accessToken = localStorage.getItem('hairSalonToken');
        if (accessToken) {
            config.headers.Authorization = `Bearer ${accessToken}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        // Dynamically import store and actions
        if (!store) {
            const { store: importedStore } = await import('../store/store');
            const { refreshAccessToken: importedRefreshAccessToken, logoutUser: importedLogoutUser } = await import('../features/auth/authSlice');
            store = importedStore;
            refreshAccessToken = importedRefreshAccessToken;
            logoutUser = importedLogoutUser;
        }

        if (error.response.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;
            try {
                const newAccessToken = await store.dispatch(refreshAccessToken()).unwrap();
                axios.defaults.headers.common['Authorization'] = `Bearer ${newAccessToken}`;
                return axiosInstance(originalRequest);
            } catch (err) {
                store.dispatch(logoutUser());
                window.location.href = '/login';
                toast.error("Hết hạn đăng nhập. Vui lòng đăng nhập lại!");
                return Promise.reject(err);
            }
        }
        return Promise.reject(error);
    }
);

export default axiosInstance;

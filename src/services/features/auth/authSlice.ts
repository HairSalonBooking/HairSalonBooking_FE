import { IAccount, IRegister } from "@/interfaces/Account";
import { LOGIN_ENDPOINT, REFRESH_TOKEN_ENDPOINT, REGISTER_ENDPOINT } from "@/services/constant/apiConfig";
import axiosInstance from "@/services/constant/axiosInstance";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

type AuthState = {
    auth: IAccount | null;
    loading: boolean;
    error: string | unknown;
    success: boolean;
    errMessage: string;
};

const initialState: AuthState = {
    auth: null,
    loading: false,
    error: null,
    success: false,
    errMessage: "",
};

export const registerAcount = createAsyncThunk<IAccount, IRegister>(
    "auth/register",
    async (data, thunkAPI) => {
        try {
            const response = await axiosInstance.post(REGISTER_ENDPOINT, data);
            if (response.data.success === false) {
                toast.error(response.data.errMessage);
            }
            if (response.data.success === true) {
                toast.success(response.data.errMessage);
            }
            return response.data;
        } catch (error: any) {
            toast.error("Server Error");
            return thunkAPI.rejectWithValue(error.response?.data || "Unknown error");
        }
    }
);


export const loginAccount = createAsyncThunk<IAccount, string | Object>(
    'auth/login',
    async (data, thunkAPI) => {
        try {
            const response = await axiosInstance.post(LOGIN_ENDPOINT, data);
            const token = response.data.accessToken;
            const refreshToken = response.data.refreshToken;
            sessionStorage.setItem('hairSalonToken', token);
            sessionStorage.setItem('hairSalonRefreshToken', refreshToken);
            if (response.data.success === false) {
                toast.error(response.data.errMessage);
            }
            if (response.data.success === true) {
                toast.success(response.data.errMessage);
            }

            return response.data;
        } catch (error: any) {
            toast.error("Server Error");
            return thunkAPI.rejectWithValue(error.response?.data || "Unknown error");
        }
    }
);

export const refreshAccessToken = createAsyncThunk<string, void>(
    'auth/refreshAccessToken',
    async (_, thunkAPI) => {
        try {
            const token = sessionStorage.getItem('hairSalonToken');
            const refreshToken = sessionStorage.getItem('hairSalonRefreshToken');

            if (!refreshToken) {
                throw new Error('No refresh token available');
            }

            const response = await axiosInstance.post(REFRESH_TOKEN_ENDPOINT, {
                accessToken: token,
                refreshToken: refreshToken,
            });

            if (response.data.success) {
                sessionStorage.setItem('hairSalonToken', response.data.accessToken);
                sessionStorage.setItem('hairSalonRefreshToken', response.data.refreshToken);
                return response.data.accessToken;
            }
        } catch (error: any) {
            thunkAPI.dispatch(logoutUser());
            throw error;
        }
    }
);


// Thêm action để logout
export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setError: (state, action: PayloadAction<string[] | unknown>) => {
            state.error = action.payload;
        },
        logoutUser: (state) => {
            // Xóa thông tin đăng nhập khỏi sessionStorage
            sessionStorage.removeItem('hairSalonToken');
            sessionStorage.removeItem('hairSalonRefreshToken');
            sessionStorage.removeItem('user'); // nếu bạn lưu thông tin user ở đây

            // Reset lại trạng thái auth
            state.auth = null;
            state.success = false;
            toast.success("Logout successful");
        },
    },
    extraReducers: (builder) => {
        builder
            // Register
            .addCase(registerAcount.pending, (state) => {
                state.loading = true;
            })
            .addCase(registerAcount.fulfilled, (state, action) => {
                state.loading = false;
                state.auth = action.payload;
                state.success = true;
            })
            .addCase(registerAcount.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(loginAccount.pending, (state) => {
                state.loading = true;
            })
            .addCase(loginAccount.fulfilled, (state, action) => {
                state.loading = false;
                state.success = true;
                state.auth = action.payload;
            })
            .addCase(loginAccount.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
        builder.addCase(refreshAccessToken.fulfilled, (state, action: PayloadAction<string>) => {
            if (state.auth) {
                state.auth.accessToken = action.payload;
            }
        });
    },
});

// Export hành động logout để sử dụng
export const { setError, logoutUser } = authSlice.actions;
export default authSlice.reducer;

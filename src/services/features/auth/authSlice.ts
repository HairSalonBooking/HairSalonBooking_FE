import { IAccount, IRegister } from "@/interfaces/Account";
import { FORGOT_PASSWORD_ENDPOINT, LOGIN_ENDPOINT, REFRESH_TOKEN_ENDPOINT, REGISTER_ENDPOINT, RESET_PASSWORD_ENDPOINT } from "@/services/constant/apiConfig";
import axiosInstance from "@/services/constant/axiosInstance";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

type AuthState = {
    auth: IAccount | null;
    loading: boolean;
    error: string | unknown;
    success: boolean;
};

const initialState: AuthState = {
    auth: null,
    loading: false,
    error: null,
    success: false,
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
                toast.success("Register Successfully");
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
            const { success, accessToken, refreshToken, errMessage, status } = response.data;

            // Kiểm tra trạng thái của người dùng
            if (status === "Inactive") {
                const inactiveMessage = "Your account is inactive. Please contact support.";
                toast.error(inactiveMessage);
                return thunkAPI.rejectWithValue(inactiveMessage);
            }

            if (!success) {
                toast.error(errMessage || "Login failed");
                return thunkAPI.rejectWithValue(errMessage || "Login failed");
            }

            localStorage.setItem('hairSalonToken', accessToken);
            localStorage.setItem('hairSalonRefreshToken', refreshToken);
            toast.success("Login successful");

            return response.data;
        } catch (error: any) {
            toast.error("Server Error");
            return thunkAPI.rejectWithValue(error.response?.data || "Unknown error");
        }
    }
);

export const forgotPassword = createAsyncThunk<IAccount, string>(
    'auth/forgotPassword',
    async (email, thunkAPI) => {
        try {
            const response = await axiosInstance.post(FORGOT_PASSWORD_ENDPOINT, { email });

            // Kiểm tra giá trị của errCode
            if (response.data.errCode === 0) {
                toast.success(response.data.message);
            } else {
                toast.error(response.data.errMessage);
                return thunkAPI.rejectWithValue(response.data.errMessage); // Trả về lỗi cho Redux state
            }

            return response.data;
        } catch (error: any) {
            const errorMessage = error.response?.data?.errMessage || "Unknown error";
            toast.error(errorMessage);
            return thunkAPI.rejectWithValue(errorMessage); // Trả về lỗi cho Redux state
        }
    }
);
export const resetPassword = createAsyncThunk<void, { token: string; newPassword: string }>(
    "auth/resetPassword",
    async ({ token, newPassword }, thunkAPI) => {
        try {
            // Tạo body với newPassword
            const formData = new URLSearchParams();
            formData.append("newPassword", newPassword);

            const response = await axiosInstance.put(
                RESET_PASSWORD_ENDPOINT.replace(":token", token), // Thay token vào URL
                formData,
                { headers: { "Content-Type": "application/x-www-form-urlencoded" } }
            );

            // Xử lý phản hồi từ API
            if (response.data.errCode === 0) {
                toast.success(response.data.message || "Password has been reset successfully.");
            } else {
                toast.error(response.data.errMessage || "Invalid or expired reset password token.");
                return thunkAPI.rejectWithValue(response.data.errMessage);
            }

        } catch (error: any) {
            // Trường hợp lỗi không mong muốn từ server
            const errorMessage = error.response?.data?.errMessage || "Unknown error occurred.";
            toast.error(errorMessage);
            return thunkAPI.rejectWithValue(errorMessage);
        }
    }
);


export const refreshAccessToken = createAsyncThunk<string, void>(
    'auth/refreshAccessToken',
    async (_, thunkAPI) => {
        try {
            const token = localStorage.getItem('hairSalonToken');
            const refreshToken = localStorage.getItem('hairSalonRefreshToken');

            if (!refreshToken) {
                throw new Error('No refresh token available');
            }

            const response = await axiosInstance.post(REFRESH_TOKEN_ENDPOINT, {
                accessToken: token,
                refreshToken: refreshToken,
            });

            if (response.data.success) {
                localStorage.setItem('hairSalonToken', response.data.accessToken);
                localStorage.setItem('hairSalonRefreshToken', response.data.refreshToken);
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
            // Xóa thông tin đăng nhập khỏi localStorage
            localStorage.removeItem('hairSalonToken');
            localStorage.removeItem('hairSalonRefreshToken');
            localStorage.removeItem('user'); // nếu bạn lưu thông tin user ở đây

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
            // Login
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
        // Forgot password
        builder.addCase(forgotPassword.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(forgotPassword.fulfilled, (state) => {
            state.loading = false;
            state.success = true;
        });
        builder.addCase(forgotPassword.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });
        // Reset password
        builder.addCase(resetPassword.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(resetPassword.fulfilled, (state) => {
            state.loading = false;
            state.success = true;
        });
        builder.addCase(resetPassword.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });
    },
});

// Export hành động logout để sử dụng
export const { setError, logoutUser } = authSlice.actions;
export default authSlice.reducer;

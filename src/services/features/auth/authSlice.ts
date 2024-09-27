import { IAccount } from "@/interfaces/Account";
import { LOGIN_ENDPOINT, REGISTER_ENDPOINT } from "@/services/constant/apiConfig";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
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

interface FormValue {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    confirmPassword: string;
}

export const registerAcount = createAsyncThunk<IAccount | Object, FormValue>(
    "auth/register",
    async (data: FormValue, thunkAPI) => {
        try {
            const response = await axios.post(REGISTER_ENDPOINT, data);
            if (response.data.errCode === 0) {
                toast.success("Register success");
            } else {
                toast.error("Register failed");
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
            const response = await axios.post(LOGIN_ENDPOINT, data);
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
        .addCase(registerAcount.fulfilled, (state) => {
            state.loading = false;
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
    },
});

// Export hành động logout để sử dụng
export const { setError, logoutUser } = authSlice.actions;
export default authSlice.reducer;

import { IAccount } from "@/interfaces/Account";
import { LOGIN_ENDPOINT } from "@/services/constant/apiConfig";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

type AuthState = {
    auth : IAccount | null;
    loading: boolean;
    error: string | unknown;
    success: boolean;
}

const initialState: AuthState = {
    auth: null,
    loading: false,
    error: null,
    success: false, 
};

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
export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setError: (state, action: PayloadAction<string[] | unknown>) => {
            state.error = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(loginAccount.pending, (state) => {
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

export const { setError } = authSlice.actions;
export default authSlice.reducer;

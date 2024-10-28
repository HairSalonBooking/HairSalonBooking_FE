import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axiosInstance from "@/services/constant/axiosInstance";
import { TOTAL_BOOKINGS_ENDPOINT, TOTAL_FEEDBACK_ENDPOINT, TOTAL_REVENUE_ENDPOINT, TOTAL_USERS_ENDPOINT } from "@/services/constant/apiConfig";

type DashboardState = {
    loading: boolean;
    totalUsers: number | null;
    totalRevenue: number | null;
    totalBookings: number | null;
    totalFeedback: number | null;
    error: string[] | unknown;
};

const initialState: DashboardState = {
    loading: false,
    totalUsers: null,
    totalRevenue: null,
    totalBookings: null,
    totalFeedback: null,
    error: null,
};

// Async thunk for fetching total users
export const getTotalUsers = createAsyncThunk<number, void>(
    "dashboard/getTotalUsers",
    async (_, thunkAPI) => {
        try {
            const response = await axiosInstance.get(TOTAL_USERS_ENDPOINT);
            return response.data;
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error.response?.data || "Unknown error");
        }
    }
);

// Async thunk for fetching total revenue
export const getTotalRevenue = createAsyncThunk<number, void>(
    "dashboard/getTotalRevenue",
    async (_, thunkAPI) => {
        try {
            const response = await axiosInstance.get(TOTAL_REVENUE_ENDPOINT);
            return response.data;
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error.response?.data || "Unknown error");
        }
    }
);

// Async thunk for fetching total bookings
export const getTotalBookings = createAsyncThunk<number, void>(
    "dashboard/getTotalBookings",
    async (_, thunkAPI) => {
        try {
            const response = await axiosInstance.get(TOTAL_BOOKINGS_ENDPOINT);
            return response.data;
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error.response?.data || "Unknown error");
        }
    }
);

// Async thunk for fetching total feedback
export const getTotalFeedback = createAsyncThunk<number, void>(
    "dashboard/getTotalFeedback",
    async (_, thunkAPI) => {
        try {
            const response = await axiosInstance.get(TOTAL_FEEDBACK_ENDPOINT);
            return response.data;
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error.response?.data || "Unknown error");
        }
    }
);

export const dashboardSlice = createSlice({
    name: "dashboards",
    initialState,
    reducers: {
        setError: (state, action: PayloadAction<string[] | unknown>) => {
            state.error = action.payload;
        },
    },
    extraReducers: (builder) => {
        // Handle total users API
        builder
            .addCase(getTotalUsers.pending, (state) => {
                state.loading = true;
            })
            .addCase(getTotalUsers.fulfilled, (state, action) => {
                state.loading = false;
                state.totalUsers = action.payload;
            })
            .addCase(getTotalUsers.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });

        // Handle total revenue API
        builder
            .addCase(getTotalRevenue.pending, (state) => {
                state.loading = true;
            })
            .addCase(getTotalRevenue.fulfilled, (state, action) => {
                state.loading = false;
                state.totalRevenue = action.payload;
            })
            .addCase(getTotalRevenue.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });

        // Handle total bookings API
        builder
            .addCase(getTotalBookings.pending, (state) => {
                state.loading = true;
            })
            .addCase(getTotalBookings.fulfilled, (state, action) => {
                state.loading = false;
                state.totalBookings = action.payload;
            })
            .addCase(getTotalBookings.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });

        // Handle total feedback API
        builder
            .addCase(getTotalFeedback.pending, (state) => {
                state.loading = true;
            })
            .addCase(getTotalFeedback.fulfilled, (state, action) => {
                state.loading = false;
                state.totalFeedback = action.payload;
            })
            .addCase(getTotalFeedback.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export const { setError } = dashboardSlice.actions;
export default dashboardSlice.reducer;

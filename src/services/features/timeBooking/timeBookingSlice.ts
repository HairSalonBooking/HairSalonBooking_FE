import { ITime, ITimeBooking } from "@/interfaces/Time";
import { GET_ALL_CODE_ENDPOINT, GET_ALL_TIME_BOOKING_ENDPOINT } from "@/services/constant/apiConfig";
import axiosInstance from "@/services/constant/axiosInstance";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

type TimeBookingState = {
    loading: boolean;
    times: ITime[] | null;
    timesByStylist: ITimeBooking[] | null;
    time: ITime | null;
    error: string[] | unknown;
}

const initialState: TimeBookingState = {
    loading: false,
    times: null,
    timesByStylist: null,
    time: null,
    error: null,
}

export const getAllTime = createAsyncThunk<ITime[], void>(
    "times/getAllTime",
    async (_, thunkAPI) => {
        try {
            const token = sessionStorage.getItem('hairSalonToken');
            const response = await axiosInstance.get(`${GET_ALL_CODE_ENDPOINT}?type=TIME`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            
            return response.data;
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error.response?.data || "Unknown error");
        }
    }
);

export const getAllTimeByStylist = createAsyncThunk<
    ITimeBooking[],
    {
        stylistId: number;
        date: number;
    }
>(
    "times/getAllTimeBookings",
    async ({ stylistId, date }, thunkAPI) => {
        try {
            const token = sessionStorage.getItem('hairSalonToken');
            const response = await axiosInstance.get(`${GET_ALL_TIME_BOOKING_ENDPOINT}?stylistId=${stylistId}&date=${date}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            return response.data.data;
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error.response?.data || "Unknown error");
        }
    }
);

export const timeBookingSlice = createSlice({
    name: "times",
    initialState,
    reducers: {
        setError: (state, action: PayloadAction<string[] | unknown>) => {
            state.error = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(getAllTime.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(getAllTime.fulfilled, (state, action) => {
            state.loading = false;
            state.times = action.payload;
        });
        builder.addCase(getAllTime.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload as string[];
        });

        builder.addCase(getAllTimeByStylist.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(getAllTimeByStylist.fulfilled, (state, action) => {
            state.loading = false;
            state.timesByStylist = action.payload;
        });
        builder.addCase(getAllTimeByStylist.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload as string[];
        });
    },
});

export const { setError } = timeBookingSlice.actions;
export default timeBookingSlice.reducer;

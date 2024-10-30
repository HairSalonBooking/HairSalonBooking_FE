import { ICreateScheduleRequest, ITime, ITimeBooking } from "@/interfaces/Time";
import { CREATE_SCHEDULE_ENDPOINT, GET_ALL_CODE_ENDPOINT, GET_ALL_TIME_BOOKING_ENDPOINT } from "@/services/constant/apiConfig";
import axiosInstance from "@/services/constant/axiosInstance";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

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
            const token = localStorage.getItem('hairSalonToken');
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
            const token = localStorage.getItem('hairSalonToken');
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

export const createSchedule = createAsyncThunk<
    { errCode: number; errMsg: string }, // Expected API response
    ICreateScheduleRequest, // Payload (schedule data)
    { rejectValue: { errCode: number; errMsg: string } }
>(
    "schedule/createSchedule",
    async (data, thunkAPI) => {
        try {
            const token = localStorage.getItem("hairSalonToken");
            const response = await axiosInstance.post(CREATE_SCHEDULE_ENDPOINT, data, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            // Check errCode for success
            if (response.data.errCode === 0) {
                toast.success(`${response.data.errMsg}`); // Complete toast
            } else {
                toast.error(`${response.data.errMsg}`); // Error toast
            }

            return response.data; // Return data for state update
        } catch (error: any) {
            toast.error(`${error.response?.data?.errMsg || 'An error occurred while creating the schedule.'}`); // Generic error toast
            return thunkAPI.rejectWithValue(error.response?.data || { errCode: 500, errMsg: "Unknown error" });
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
        // create schedule
        builder.addCase(createSchedule.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(createSchedule.fulfilled, (state, action) => {
            state.loading = false;
            if (action.payload.errCode === 0) {
                // Complete message handling (e.g., showing a toast notification)
                console.log(action.payload.errMsg);
            }
        });
        builder.addCase(createSchedule.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload ? action.payload.errMsg : "Unknown error";
        });
    },
        

});

export const { setError } = timeBookingSlice.actions;
export default timeBookingSlice.reducer;

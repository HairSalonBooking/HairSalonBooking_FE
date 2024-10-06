import { ITime } from "@/interfaces/Time";
import { GET_ALL_CODE_ENDPOINT } from "@/services/constant/apiConfig";
import axiosInstance from "@/services/constant/axiosInstance";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

type TimeBookingState = {
    loading: boolean;
    times: ITime[] | null;
    time: ITime | null;
    error: string[] | unknown;
}

const initialState: TimeBookingState = {
    loading: false,
    times: null,
    time: null,
    error: null,
}

export const getAllTime = createAsyncThunk<ITime[], void>(
    "times/getAllTime",
    async (_,thunkAPI) => {
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
    },
});

export const { setError } = timeBookingSlice.actions;
export default timeBookingSlice.reducer;

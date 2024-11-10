import { ICreateFeedback, IFeedback } from "@/interfaces/Feedback";
import { CREATE_FEEDBACK_ENDPOINT, GET_FEEDBACK_SERVICE_ENDPOINT } from "@/services/constant/apiConfig";
import axiosInstance from "@/services/constant/axiosInstance";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

type FeedbacState = {
    loading: boolean;
    feedbacks: IFeedback[] | null;
    feedback: IFeedback | null;
    error: string[] | unknown;
}

const initialState: FeedbacState = {
    loading: false,
    feedbacks: null,
    feedback: null,
    error: null,
}

export const viewFeedbackOfService = createAsyncThunk<IFeedback[], { serviceId: number }>(
    "feedback/viewFeedOfService",
    async (data, thunkAPI) => {
        const { serviceId } = data;
        try {
            const token = localStorage.getItem('hairSalonToken');
            const response = await axiosInstance.get(`${GET_FEEDBACK_SERVICE_ENDPOINT}?serviceId=${serviceId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            return response.data.feedback;
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error.response?.data || "Unknown error");
        }
    }
);

export const createFeedback = createAsyncThunk<IFeedback, ICreateFeedback>(
    "feedback/createFeedback",
    async (data: ICreateFeedback, thunkAPI) => {
        try {
            const token = localStorage.getItem('hairSalonToken');
            const response = await axiosInstance.post(CREATE_FEEDBACK_ENDPOINT, data, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            if (response.data.success === false) {
                toast.error(response.data.errMessage);
            }
            if (response.data.success === true) {
                toast.success(response.data.message);
            }

            return response.data;
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error.response?.data || "Unknown error");
        }
    }
);

export const feedbackSlice = createSlice({
    name: "feedback",
    initialState,
    reducers: {
        setError: (state, action: PayloadAction<string[] | unknown>) => {
            state.error = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(viewFeedbackOfService.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(viewFeedbackOfService.fulfilled, (state, action) => {
            state.loading = false;
            state.feedbacks = action.payload;
        });
        builder.addCase(viewFeedbackOfService.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload as string[];
        });

        builder.addCase(createFeedback.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(createFeedback.fulfilled, (state, action) => {
            state.loading = false;
            state.feedback = action.payload;
        });
        builder.addCase(createFeedback.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload as string[];
        });
    },
});

export const { setError } = feedbackSlice.actions;
export default feedbackSlice.reducer;
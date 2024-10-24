import { IBooking, IBookingRequest } from "@/interfaces/Booking";
import { ICustomerBooking } from "@/interfaces/CustomerBooking";
import { CANCEL_BOOKING_BY_CUSTOMER_ENDPOINT, CUSTOMER_BOOKING_ENDPOINT, GET_BOOKING_CUSTOMER_ENDPOINT, GET_BOOKING_ENDPOINT, VERIFY_BOOKING_ENDPOINT } from "@/services/constant/apiConfig";
import axiosInstance from "@/services/constant/axiosInstance";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { toast } from "react-toastify";


type BookingState = {
    loading: boolean;
    bookings: IBooking[] | null;
    booking: IBooking | null;
    customerBooking: ICustomerBooking[] | null;
    error: string[] | unknown;
}

const initialState: BookingState = {
    loading: false,
    customerBooking: null,
    bookings: null,
    booking: null,
    error: null,
}


export const getAllBooking = createAsyncThunk<IBooking[], { date: string }>(
    "bookings/getAllBooking",
    async ({ date }, thunkAPI) => {
        try {
            const token = sessionStorage.getItem('hairSalonToken');
            const response = await axiosInstance.get(GET_BOOKING_ENDPOINT, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                params: {
                    date: date,  // Passing the date as a query parameter
                },
            });

            // Extract the bookings array from response.data
            return response.data.data;
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error.response?.data || "Unknown error");
        }
    }
);


export const customerCreateBooking = createAsyncThunk<IBooking, IBookingRequest, { rejectValue: { errCode: number, errMsg: string } }>(
    "bookings/customerCreateBooking",
    async (data, thunkAPI) => {
        try {
            const token = sessionStorage.getItem('hairSalonToken');
            const params = new URLSearchParams();

            // Append regular fields
            Object.entries(data).forEach(([key, value]) => {
                if (key !== "serviceIds") {
                    params.append(key, String(value));
                }
            });

            // Manually append array fields for serviceIds[]
            data.serviceIds.forEach(serviceId => {
                params.append("serviceIds[]", String(serviceId));
            });

            const response = await axiosInstance.post(CUSTOMER_BOOKING_ENDPOINT, params, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
            });

            return response.data;
        } catch (error: any) {
            // Check if error response exists, otherwise return a default error
            if (error.response && error.response.data) {
                return thunkAPI.rejectWithValue({
                    errCode: error.response.data.errCode || 1,
                    errMsg: error.response.data.errMsg || 'Unknown error occurred',
                });
            } else {
                return thunkAPI.rejectWithValue({
                    errCode: 1,
                    errMsg: 'Unknown error occurred',
                });
            }
        }
    }
);

export const getCustomerBooking = createAsyncThunk<ICustomerBooking[], { customerId: number }>(
    "customerBookings/getCustomerBooking",
    async (data, thunkAPI) => {
        try {
            const token = sessionStorage.getItem('hairSalonToken');
            const response = await axiosInstance.get(
                `${GET_BOOKING_CUSTOMER_ENDPOINT}?customerId=${data.customerId}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            return response.data.data;
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error.response?.data || "Unknown error");
        }
    }
);

export const verifyBooking = createAsyncThunk<
    IBooking,
    { token: string; paymentId: string; payerId: string; stylistId: string },
    { rejectValue: { errCode: number; errMsg: string } }
>(
    "bookings/verifyBooking",
    async (data, thunkAPI) => {
        try {
            const params = new URLSearchParams();
            params.append("token", data.token);
            params.append("paymentId", data.paymentId);
            params.append("payerId", data.payerId);
            params.append("stylistId", data.stylistId);

            const response = await axiosInstance.post(VERIFY_BOOKING_ENDPOINT, params, {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
            });

            return response.data;
        } catch (error: any) {
            if (error.response && error.response.data) {
                return thunkAPI.rejectWithValue({
                    errCode: error.response.data.errCode || 1,
                    errMsg: error.response.data.errMsg || 'Unknown error occurred',
                });
            } else {
                return thunkAPI.rejectWithValue({
                    errCode: 1,
                    errMsg: 'Unknown error occurred',
                });
            }
        }
    }
);

export const cancleBookingByCustomer = createAsyncThunk<any, { bookingId: number }>(
    "bookings/cancleBookingByCustomer",
    async ({ bookingId }, thunkAPI) => {
        try {
            const token = sessionStorage.getItem('hairSalonToken');
            const response = await axiosInstance.put(`${CANCEL_BOOKING_BY_CUSTOMER_ENDPOINT}`,
                { bookingId },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            if (response.data.errCode === 0) {
                toast.success("Booking canceled successfully");
            }
            return response.data; // Return the response data

        } catch (error: any) {
            return thunkAPI.rejectWithValue(error.response?.data || "Unknown error");
        }
    }
)
export const bookingSlice = createSlice({
    name: "bookings",
    initialState,
    reducers: {
        setError: (state, action: PayloadAction<string[] | unknown>) => {
            state.error = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(getAllBooking.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(getAllBooking.fulfilled, (state, action) => {
            state.loading = false;
            state.bookings = action.payload;
        });
        builder.addCase(getAllBooking.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
        });

        builder.addCase(customerCreateBooking.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(customerCreateBooking.fulfilled, (state, action) => {
            state.loading = false;
            state.booking = action.payload;
        });
        builder.addCase(customerCreateBooking.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
        });
        //verifyBooking
        builder.addCase(verifyBooking.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(verifyBooking.fulfilled, (state, action) => {
            state.loading = false;
            state.booking = action.payload;
        });
        builder.addCase(verifyBooking.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
        });
        // Customer Booking Service
        builder.addCase(getCustomerBooking.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(getCustomerBooking.fulfilled, (state, action) => {
            state.loading = false;
            state.customerBooking = action.payload;
        });
        builder.addCase(getCustomerBooking.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
        });
    },
});

export const { setError } = bookingSlice.actions;
export default bookingSlice.reducer;
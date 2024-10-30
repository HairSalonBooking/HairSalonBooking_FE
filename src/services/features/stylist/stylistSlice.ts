import { IAccount, IRegister } from "@/interfaces/Account";
import { ISalary } from "@/interfaces/Salary";
import { ICreateSalary, IStylist } from "@/interfaces/Stylist";
import { COMPLETE_BOOKING_BY_STYLIST_ENDPOINT, CREATE_SALARY_FOR_STYLIST_ENDPOINT, GET_STYLIST_BY_ID_ENDPOINT, GET_STYLIST_ENDPOINT, PAID_SALARY_ENDPOINT, REGISTER_ENDPOINT, VIEW_SALARY_BY_STYLIST_ENDPOINT } from "@/services/constant/apiConfig";
import axiosInstance from "@/services/constant/axiosInstance";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { toast } from "react-toastify";



type StylistState = {
    loading: boolean;
    stylists: IStylist[] | null;
    stylist: IStylist | null;
    salary: ISalary[] | null;
    error: string[] | unknown;
}

const initialState: StylistState = {
    loading: false,
    stylists: null,
    stylist: null,
    salary: null,
    error: null,
}

export const getAllStylist = createAsyncThunk<IStylist[], void>(
    "stylists/getAllStylist",
    async (_, thunkAPI) => {
        try {
            const token = sessionStorage.getItem('hairSalonToken');
            const response = await axiosInstance.get(GET_STYLIST_ENDPOINT, {
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

export const getStylistById = createAsyncThunk<IStylist, { id: number }>(
    "stylists/getStylistById",
    async (data, thunkAPI) => {
        const { id } = data;
        try {
            const token = sessionStorage.getItem('hairSalonToken');
            const response = await axiosInstance.get(`${GET_STYLIST_BY_ID_ENDPOINT}/${id}`, {
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

export const createStylist = createAsyncThunk<IAccount, IRegister>(
    "stylists/createStylist",
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

export const createSalaryForStylist = createAsyncThunk<Object, ICreateSalary>(
    "stylists/createSalaryForStylist",
    async (data: ICreateSalary, thunkAPI) => {
        try {
            const token = sessionStorage.getItem('hairSalonToken');
            const response = await axiosInstance.post(CREATE_SALARY_FOR_STYLIST_ENDPOINT, data, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            if (response.data.message) {
                toast.error(`${response.data.message}`);
            } else if (!response.data.message) {
                toast.success("Create Salary Successfully");
            }
            return response.data;
        } catch (error: any) {
            toast.error("Server Error");
            return thunkAPI.rejectWithValue(error.response?.data || "Unknown error");
        }
    }
);

export const viewSalaryByStylist = createAsyncThunk<ISalary[], { stylistId: number }>(
    "stylists/viewSalaryByStylist",
    async (data, thunkAPI) => {
        const { stylistId } = data;
        try {
            const token = sessionStorage.getItem('hairSalonToken');
            const response = await axiosInstance.get(`${VIEW_SALARY_BY_STYLIST_ENDPOINT}?stylistId=${stylistId}`,
                {
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

export const paidSalary = createAsyncThunk<Object, { id: number }>(
    "stylists/paidSalary",
    async (id, thunkAPI) => {
        try {
            const token = sessionStorage.getItem('hairSalonToken');
            const response = await axiosInstance.put(`${PAID_SALARY_ENDPOINT}`, id, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            if (response.data.errCode === 0) {
                toast.success(`${response.data.errMessage}`);
            } else {
                toast.error(`${response.data.errMessage}`);
            }
            return response.data;
        } catch (error: any) {
            toast.error("Server Error");
            return thunkAPI.rejectWithValue(error.response?.data || "Unknown error");
        }
    }
);

export const completeBookingByStylist = createAsyncThunk<Object, { bookingId: number, email: string }>(
    "stylists/completeBookingByStylist",
    async ({ bookingId, email }, thunkAPI) => {
        try {
            const token = sessionStorage.getItem('hairSalonToken');
            const response = await axiosInstance.post(`${COMPLETE_BOOKING_BY_STYLIST_ENDPOINT}`,
                { bookingId, email }, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            if (response.data.errCode === 0) {
                toast.success("Complete booking successfully");
            } else {
                toast.error(`${response.data.errMsg}`);
            }
            return response.data;
        } catch (error: any) {
            toast.error("Server Error");
            return thunkAPI.rejectWithValue(error.response?.data || "Unknown error");
        }
    }
);

export const stylistSlice = createSlice({
    name: "stylists",
    initialState,
    reducers: {
        setError: (state, action: PayloadAction<string[] | unknown>) => {
            state.error = action.payload;
        },
    },
    extraReducers(builder) {
        builder.addCase(getAllStylist.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(getAllStylist.fulfilled, (state, action) => {
            state.loading = false;
            state.stylists = action.payload;
        });
        builder.addCase(getAllStylist.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });
        //getStylistById
        builder.addCase(getStylistById.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(getStylistById.fulfilled, (state, action) => {
            state.loading = false;
            state.stylist = action.payload;
        });
        builder.addCase(getStylistById.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });
        //createStylist
        builder.addCase(createStylist.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(createStylist.fulfilled, (state) => {
            state.loading = false;
        });
        builder.addCase(createStylist.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });

        //createSalaryForStylist
        builder.addCase(createSalaryForStylist.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(createSalaryForStylist.fulfilled, (state) => {
            state.loading = false;
        });
        builder.addCase(createSalaryForStylist.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });

        //viewSalaryByStylist
        builder.addCase(viewSalaryByStylist.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(viewSalaryByStylist.fulfilled, (state, action) => {
            state.loading = false;
            state.salary = action.payload;
        });
        builder.addCase(viewSalaryByStylist.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });

        //paidSalary
        builder.addCase(paidSalary.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(paidSalary.fulfilled, (state) => {
            state.loading = false;
        });
        builder.addCase(paidSalary.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });


    },

});

export const { setError } = stylistSlice.actions;
export default stylistSlice.reducer;
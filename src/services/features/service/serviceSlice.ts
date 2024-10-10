import { IService } from "@/interfaces/Service";
import { CREATE_SERVICE_ENDPOINT, DELETE_SERVICE_ENDPOINT, GET_SERVICE_BY_ID_ENDPOINT, GET_SERVICE_ENDPOINT } from "@/services/constant/apiConfig";
import axiosInstance from "@/services/constant/axiosInstance";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { toast } from "react-toastify";


type ServiceState = {
    loading: boolean;
    services: IService[] | null;
    service: IService | null;
    error: string[] | unknown;
};

const initialState: ServiceState = {
    loading: false,
    services: null,
    service: null,
    error: null,
};


export const getAllService = createAsyncThunk<IService[], void>(
    "services/getAllService",
    async (_, thunkAPI) => {
        try {
            const token = sessionStorage.getItem('hairSalonToken');
            const response = await axiosInstance.get(GET_SERVICE_ENDPOINT, {
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

export const getServiceById = createAsyncThunk<IService, { id: number }>(
    "services/getServiceById",
    async (data, thunkAPI) => {
        const { id } = data;
        try {
            const token = sessionStorage.getItem('hairSalonToken');
            const response = await axiosInstance.get(`${GET_SERVICE_BY_ID_ENDPOINT}/${id}`,
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

export const createService = createAsyncThunk<IService, FormData>(
    'services/createService',
    async (data, thunkAPI) => {
        try {
            const token = sessionStorage.getItem('hairSalonToken');
            const response = await axiosInstance.post(CREATE_SERVICE_ENDPOINT, data, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    // Remove 'Content-Type': 'multipart/form-data' header here
                },
            });

            // Check errCode for success instead of response.data.success
            if (response.data.errCode === 0) {
                toast.success(`${response.data.errMessage}`);
            } else {
                toast.error(`${response.data.errMessage}`);
            }

            return response.data;
        } catch (error: any) {
            toast.error(`${error.response.data.errors}`);
            return thunkAPI.rejectWithValue(error.response.data);
        }
    },
);

export const deleteService = createAsyncThunk<IService, { id: number }>(
    'services/deleteService',
    async (data, thunkAPI) => {
        const { id } = data;
        try {
            const token = sessionStorage.getItem('hairSalonToken');
            const response = await axiosInstance.delete(`${DELETE_SERVICE_ENDPOINT}?id=${id}`, {
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
            return thunkAPI.rejectWithValue(error.response?.data || "Unknown error");
        }
    },
);


export const serviceSlice = createSlice({
    name: "services",
    initialState,
    reducers: {
        setError: (state, action: PayloadAction<string[] | unknown>) => {
            state.error = action.payload;
        },
    },
    extraReducers(builder) {
        builder
            .addCase(getAllService.pending, (state) => {
                state.loading = true;
            })
            .addCase(getAllService.fulfilled, (state, action) => {
                state.loading = false;
                state.services = action.payload;
            })
            .addCase(getAllService.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            //getServiceById
            .addCase(getServiceById.pending, (state) => {
                state.loading = true;
            })
            .addCase(getServiceById.fulfilled, (state, action) => {
                state.loading = false;
                state.service = action.payload;
            })
            .addCase(getServiceById.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });

        //createService
        builder
            .addCase(createService.pending, (state) => {
                state.loading = true;
            })
            .addCase(createService.fulfilled, (state, action) => {
                state.loading = false;
                state.services = [...(state.services || []), action.payload];
            })
            .addCase(createService.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });

        // deleteService
        builder
            .addCase(deleteService.pending, (state) => {
                state.loading = true;
            })
            .addCase(deleteService.fulfilled, (state, action) => {
                state.loading = false;
                state.services = (state.services || []).filter((service) => service.id !== action.payload.id);
            })
            .addCase(deleteService.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });

    },
});

export const { setError } = serviceSlice.actions;
export default serviceSlice.reducer;
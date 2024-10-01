import { IStylist } from "@/interfaces/Stylist";
import { GET_STYLIST_BY_ID_ENDPOINT, GET_STYLIST_ENDPOINT } from "@/services/constant/apiConfig";
import axiosInstance from "@/services/constant/axiosInstance";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";



type StylistState = {
    loading: boolean;
    stylists: IStylist[] | null;
    stylist: IStylist | null;
    error: string[] | unknown;
}

const initialState: StylistState = {
    loading: false,
    stylists: null,
    stylist: null,
    error: null,
}

export const getAllStylist = createAsyncThunk<IStylist[], void>(
    "stylists/getAllStylist",
    async (_,thunkAPI) => {
        try {
            const token = sessionStorage.getItem('hairSalonToken');
            const response = await axiosInstance.get(GET_STYLIST_ENDPOINT, {
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

export const getStylistById = createAsyncThunk<IStylist, {id:number}>(
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
    },

});

export const { setError } = stylistSlice.actions;
export default stylistSlice.reducer;

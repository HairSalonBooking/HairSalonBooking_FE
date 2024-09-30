import { IEditUser, IUser } from "@/interfaces/User";
import { GET_USER_BY_ID_ENDPOINT, GET_USER_ENDPOINT } from "@/services/constant/apiConfig";
import axiosInstance from "@/services/constant/axiosInstance";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

type UserState = {
    loading: boolean;
    users: IUser[];
    user: IUser | null;
    error: string[] | unknown;
}

const initialState: UserState = {
    loading: false,
    users: [],
    user: null,
    error: null,
}

export const getAllUser = createAsyncThunk<IUser[], void>(
    "users/getAllUser",
    async (_,thunkAPI) => {
        try {
            const token = sessionStorage.getItem('hairSalonToken');
            const response = await axiosInstance.get(GET_USER_ENDPOINT, {
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

export const getUserById = createAsyncThunk<IUser, {id:number}>(
    "users/getUserById",
    async (data, thunkAPI) => {
        const { id } = data;
        try {
            const token = sessionStorage.getItem('hairSalonToken');
            const response = await axiosInstance.get(`${GET_USER_BY_ID_ENDPOINT}/${id}`, {
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

export const editUserbyID = createAsyncThunk<IUser, {id:number, data: IEditUser}>(
    "users/editUserById",
    async ({id,data},thunkAPI) => {
        try {
            const token = sessionStorage.getItem('hairSalonToken');
            const response = await axiosInstance.put(`${GET_USER_ENDPOINT}/${id}`, data, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            if (response.data.success === false) {
                toast.error(response.data.errMessage);
            }
            if (response.data.success === true) {
                toast.success(response.data.errMessage);
            }
            return response.data;
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error.response?.data || "Unknown error");
        }
    }
);


export const userSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        setError: (state, action: PayloadAction<string[] | unknown>) => {
            state.error = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(getAllUser.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(getAllUser.fulfilled, (state, action) => {
            state.loading = false;
            state.users = action.payload;
        });
        builder.addCase(getAllUser.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });

        builder.addCase(getUserById.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(getUserById.fulfilled, (state, action) => {
            state.loading = false;
            state.user = action.payload;
        });
        builder.addCase(getUserById.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });
    }
});

export const { setError } = userSlice.actions;
export default userSlice.reducer;
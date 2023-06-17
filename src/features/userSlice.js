import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    user: null,
    loading: false,
    error: null,
};

const BASE_URL = "http://localhost:8080/api/sf/account";

export const getUserProfile = createAsyncThunk(
    "user/getUserProfile",
    async (_, thunkAPI) => {
        const token = localStorage.getItem("token");
        if (!token) {
            return null;
        }
        try {
            const response = await axios.get(`${BASE_URL}/profile`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            console.log(response.data);
            return response.data;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
);

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload;
        },
        setLoading: (state, action) => {
            state.loading = action.payload;
        },
        setError: (state, action) => {
            state.error = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getUserProfile.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getUserProfile.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload;
            })
            .addCase(getUserProfile.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
    },
});

export const { setUser, setLoading, setError } = userSlice.actions;

export default userSlice.reducer;

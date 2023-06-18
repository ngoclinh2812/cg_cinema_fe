import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {findAllTheaters, findTheater} from "../../api/theaterAPI";

const initialState = {
    values: [],
    value: {},
    loading: false,
    error: null,
    success: false,
};

export const getTheaters = createAsyncThunk("theater",
    async () => {
    const response = await findAllTheaters();
    console.log(response.data.dataList);
    return response.data.dataList;
});

export const getTheater = createAsyncThunk("theater/detail",
    async (theaterId) => {
        console.log("theaterId: ", theaterId);
        const response = await findTheater(theaterId);
    return response.data;
})

export const theaterSlice = createSlice({
    name: "theater",
    initialState,
    reducers: {
        setLoading: (state, action) => {
            state.loading = action.payload;
        },
        setError: (state, action) => {
            state.error = action.payload;
        },
        setSuccess: (state, action) => {
            state.success = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getTheaters.pending, (state) => {
                state.success = false;
                state.loading = true;
                state.error = false;
            })
            .addCase(getTheaters.rejected, (state, action) => {
                state.success = false;
                state.loading = false;
                state.error = action.error;
            })
            .addCase(getTheaters.fulfilled, (state, action) => {
                state.success = true;
                state.loading = false;
                state.values = action.payload;
                state.error = false;
            })
            .addCase(getTheater.pending, (state) => {
                state.success = false;
                state.loading = true;
                state.error = false;
            })
            .addCase(getTheater.rejected, (state, action) => {
                state.success = false;
                state.loading = false;
                state.error = action.error;
            })
            .addCase(getTheater.fulfilled, (state, action) => {
                state.success = true;
                state.loading = false;
                state.value = action.payload;
                state.error = false;
            })
    }
});


export const { setLoading, setError, setSuccess } = theaterSlice.actions;

export const selectLoading = (state) => state.theater.loading;
export const selectError = (state) => state.theater.error;
export const selectSuccess = (state) => state.theater.success;
export const selectTheaterList = (state) => state.theater?.values;
export const selectTheater = (state) => state.theater?.value;

export default theaterSlice.reducer;
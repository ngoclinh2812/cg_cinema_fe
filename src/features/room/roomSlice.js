import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { findRoom } from "../../api/RoomAPI";

const initialState = {
    values: [],
    value: {},
    loading: false,
    error: null,
    success: false,
};

export const getRoom = createAsyncThunk("room/detail",
    async (roomId) => {
    const response = await findRoom(roomId);
    console.log(response.data);
    return response.data;
})

export const roomSlice = createSlice({
    name: "room",
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
            .addCase(getRoom.pending, (state) => {
                state.success = false;
                state.loading = true;
                state.error = false;
            })
            .addCase(getRoom.rejected, (state, action) => {
                state.success = false;
                state.loading = false;
                state.error = action.error;
            })
            .addCase(getRoom.fulfilled, (state, action) => {
                state.success = true;
                state.loading = false;
                state.values = action.payload;
                state.error = false;
            })
    }
});

export const { setLoading, setError, setSuccess } = roomSlice.actions;

export const selectLoading = (state) => state.room.loading;
export const selectError = (state) => state.room.error;
export const selectSuccess = (state) => state.room.success;
export const selectRoom = (state) => state.room.values;
export default roomSlice.reducer;
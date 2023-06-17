import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    ticketList: [],
    ticket: {},
    loading: false,
    error: null,
    success: false
};

const BASE_URL = "http://localhost:8080/api/ticket";

export const getTickets = createAsyncThunk(
    "ticket/getTicket",
    async (_, thunkAPI) => {
        const token = localStorage.getItem("token");
        if (!token) {
            return null;
        }
        try {
            const response = await axios.get(`${BASE_URL}`, {
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

const ticketSlice = createSlice({
    name: "ticket",
    initialState,
    reducers: {
        setTicket: (state, action) => {
            state.ticket = action.payload;
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
            .addCase(getTickets.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getTickets.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload;
            })
            .addCase(getTickets.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
    },
});

export const { setTicket, setLoading, setError } = userSlice.actions;
export const selectTickets = (state) => state.ticket.ticketList;

export default ticketSlice.reducer;

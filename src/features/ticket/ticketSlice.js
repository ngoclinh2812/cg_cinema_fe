import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    ticketList: [],
    ticket: {
        scheduleMovie: {
            room: {
                id: "",
            },
            movie: {
                id: "",
            },
            schedule: {
                id: "",
            },
        },
        seat: {
            id: "",
        },
    },
    loading: false,
    error: null,
    success: false,
};

const BASE_URL = "http://localhost:8080/api/ticket";

export const getTickets = createAsyncThunk("ticket/getTickets", async () => {
    const token = localStorage.getItem("token");
    console.log(token);
    if (!token) {
        return null;
    }
    try {
        const response = await axios.get(`${BASE_URL}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        console.log(response.data.dataList);
        return response.data.dataList;
    } catch (error) {
        console.error(error);
        throw error;
    }
});

export const saveTicket = createAsyncThunk(
    "ticket/saveTicket",
    async (_, { getState }) => {
        const token = localStorage.getItem('token');
        console.log(token);
        if (!token) {
            return null;
        }

        try {
            const ticketData = getState().ticket.ticket;
            const response = await axios.post(`${BASE_URL}/save`, ticketData, {
                headers: {
                    "Content-Type" : "application/json",
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
        setScheduleMovie: (state, action) => {
            state.ticket.scheduleMovie = action.payload;
        },
        setSeat: (state, action) => {
            state.ticket.seat = action.payload;
        },
        setRoomId: (state, action) => {
            state.ticket.scheduleMovie.room.id = action.payload;
        },
        clearTicket: (state) => {
            state.ticket = initialState.ticket;
            state.loading = false;
            state.error = null;
            state.success = false;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(saveTicket.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.success = false;
            })
            .addCase(saveTicket.fulfilled, (state, action) => {
                state.loading = false;
                state.success = true;
            })
            .addCase(saveTicket.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
                state.success = false;
            });
    },
});

export const { setSuccess, setLoading, setError, clearTicket, setScheduleMovie, setSeat, setRoomId } = ticketSlice.actions;
export const selectTickets = (state) => state.ticket.ticketList;
export const selectTicket = (state) => state.ticket.ticket;

export default ticketSlice.reducer;

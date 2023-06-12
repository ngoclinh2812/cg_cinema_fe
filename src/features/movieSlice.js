import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const MOVIE_API = "http://localhost:8080/api";

export const fetchMovies = createAsyncThunk("movies/fetchMovies", async () => {
    let result = null;
    try {
        result = await axios.get(`${MOVIE_API}/movies`);
    } catch (error) {
        console.log("Fetch movies API error: " + error);
    }
    return result?.data;
});

const initialState = {
    movies: [],
    loading: false,
    error: null,
};

export const moviesSlice = createSlice({
    name: "movies",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchMovies.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchMovies.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(fetchMovies.fulfilled, (state, action) => {
                state.loading = false;
                state.movies = action.payload;
                state.error = null;
            });
    },
});

export default moviesSlice.reducer;

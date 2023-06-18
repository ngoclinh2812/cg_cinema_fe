import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { fetchMoviesFromAPI, onGoingMovies, comingSoonMovies } from "../../api/movieAPI";

const initialState = {
    movies: [],
    movie: {},
    ongoingMovies: [],
    comingSoonMovies: [],
    loading: false,
    error: null,
    success: false,
};

const MOVIE_API = "http://localhost:8080/api/movies";

export const fetchMovies = createAsyncThunk("movies/fetchMovies", async () => {
    let result = null;
    try {
        result = await fetchMoviesFromAPI();
        result = await axios.get(`${MOVIE_API}`);
        console.log(result.data.dataList);
    } catch (error) {
        console.log("Fetch movies API error: " + error);
    }
    return result?.data.dataList;
});

export const fetchOngoingMovies = createAsyncThunk(
    "movies/fetchOngoingMovies",
    async () => {
        console.log("data");
        let result = null;
        try {
            result = await onGoingMovies();
            console.log(result.data.dataList);
        } catch (error) {
            console.log("Fetch movies API error: " + error);
        }
        return result?.data.dataList;
    }
);

export const fetchComingSoonMovies = createAsyncThunk(
    "movies/fetchComingSoonMovies",
    async () => {
        console.log("data");
        let result = null;
        try {
            result = await comingSoonMovies();
            console.log(result.data.dataList);
        } catch (error) {
            console.log("Fetch movies API error: " + error);
        }
        return result?.data.dataList;
    }
);

// Async thunk to fetch movie details
export const fetchMovieDetails = createAsyncThunk(
    "movies/fetchMovieDetails",
    async (movieId, { dispatch }) => {
        console.log("data");
        console.log(movieId);
        let result = null;
        try {
            result = await axios.get(`${MOVIE_API}/${movieId}`);
            console.log(result.data);
            dispatch(fetchOngoingMovies()); // Dispatch fetchOngoingMovies action after fetching movie details
        } catch (error) {
            console.log("Fetch movie details API error: " + error);
        }
        return result?.data;
    }
);

export const movieSlice = createSlice({
    name: "movie",
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
        },
    },
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
            })
            .addCase(fetchMovieDetails.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchMovieDetails.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(fetchMovieDetails.fulfilled, (state, action) => {
                state.loading = false;
                state.movie = action.payload;
                state.error = null;
            })
            .addCase(fetchOngoingMovies.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchOngoingMovies.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(fetchOngoingMovies.fulfilled, (state, action) => {
                state.loading = false;
                state.ongoingMovies = action.payload;
                state.error = null;
            })
            .addCase(fetchComingSoonMovies.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchComingSoonMovies.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(fetchComingSoonMovies.fulfilled, (state, action) => {
                state.loading = false;
                state.comingSoonMovies = action.payload;
                state.error = null;
            });
    },
});

export const { setLoading, setError, setSuccess } = movieSlice.actions;

export const selectLoading = (state) => state.movie.loading;
export const selectError = (state) => state.movie.error;
export const selectSuccess = (state) => state.movie.success;
export const selectMovieList = (state) => state.movie.movies;
export const selectMovieAdded = (state) => state.movie.movie;
export const selectMovieEdited = (state) => state.movie.movie;
export const selectOngoingMovies = (state) => state.movie.ongoingMovies;
export const selectComingSoonMovies = (state) => state.movie.comingSoonMovies;
export const selectMovieRemoved = (state) => state.movie.movie;
export const selectMovieDetails = (state) => state.movie.movie;

export default movieSlice.reducer;

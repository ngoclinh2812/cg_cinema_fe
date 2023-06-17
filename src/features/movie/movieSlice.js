import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import {fetchMoviesFromAPI , OnGoing} from "../../api/movieAPI";


const initialState = {
    movies: [],
    movie: {},
    loading: false,
    error: null,
};

const MOVIE_API = "http://localhost:8080/api";

export const fetchMovies = createAsyncThunk("movies/fetchMovies", async () => {
      let result = null;
      try {
          result = await fetchMoviesFromAPI();
      } catch (error) {
          console.log("Fetch movies API error: " + error);
      }
      return result?.data.dataList;
  });

// Async thunk to fetch movie details
export const fetchMovieDetails = createAsyncThunk(
      'movies/fetchMovieDetails',
      async (movieId) => {
        let result = null;
        try {
          result = await axios.get(`${MOVIE_API}/${movieId}`);
          console.log(result.data);
        } catch (error) {
          console.log('Fetch movie details API error: ' + error);
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
    },
});

export const { setLoading, setError, setSuccess } = movieSlice.actions;

export const selectLoading = (state) => state.movie.loading;
export const selectError = (state) => state.movie.error;
export const selectSuccess = (state) => state.movie.success;
export const selectMovieList = (state) => state.movie.movies;
export const selectMovieAdded = (state) => state.movie.movie;
export const selectMovieEdited = (state) => state.movie.movie;
export const selectMovieRemoved = (state) => state.movie.movie;

export const selectMovieDetails = (state) => state.movie.movie;

export default movieSlice.reducer;

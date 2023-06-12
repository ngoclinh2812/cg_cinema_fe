import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
  import {
      movies,
  }from "../../api/movieAPI";


  const  initialState = {
      values: null,
      value: null,
      loading: false,
      error: null,
      success: false,
  };
export const getMovies = createAsyncThunk("", async () => {
    const response = await movies();
    return response.data.dataList;
});
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
            //Update states of get books action
            .addCase(getMovies.pending, (state) => {
                state.success = false;
                state.loading = true;
                state.error = false;
            })
            .addCase(getMovies.rejected, (state, action) => {
                state.success = false;
                state.loading = false;
                state.error = action.error;
            })
            .addCase(getMovies.fulfilled, (state, action) => {
                state.success = true;
                state.loading = false;
                state.values = action.payload;
                state.error = false;
            })

            //Update states of get book action
    },
});
export const { setLoading, setError, setSuccess } = movieSlice.actions;

export const selectLoading = (state) => state.movie.loading;
export const selectError = (state) => state.movie.error;
export const selectSuccess = (state) => state.movie.success;
export const selectMovieList = (state) => state.movie.values;
export const selectMovieDetail = (state) => state.movie.value;
export const selectMovieAdded = (state) => state.movie.value;
export const selectMovieEdited = (state) => state.movie.value;
export const selectMovieRemoved = (state) => state.movie.value;


export const setLoadingTrueIfCalled = (isCalled) => (dispatch, getState) => {
    const currentValue = selectLoading(getState());
    if (currentValue === isCalled) {
        dispatch(setLoading(true));
    }
};

export default movieSlice.reducer;

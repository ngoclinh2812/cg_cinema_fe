import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    loggingIn: false,
    error: null,
};

const loginSlice = createSlice({
    name: "login",
    initialState,
    reducers: {
        setLoggingIn: (state, action) => {
            state.loggingIn = action.payload;
        },
        setError: (state, action) => {
            state.error = action.payload;
        },
    },
});

export const { setLoggingIn, setError } = loginSlice.actions;

export default loginSlice.reducer;

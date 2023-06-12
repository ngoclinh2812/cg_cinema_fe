import { createSlice } from '@reduxjs/toolkit';
import { loginUser } from '../api/userAPI';

const initialState = {
    loggingIn: false,
    error: null,
};

const loginSlice = createSlice({
    name: 'login',
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

export const login = (username, password) => async (dispatch) => {
    dispatch(setLoggingIn(true));

    try {
        await loginUser({ username, password });
        dispatch(setError(null));
        // Login success, redirect or show success message
    } catch (error) {
        dispatch(setError(error.message));
    } finally {
        dispatch(setLoggingIn(false));
    }
};

export default loginSlice.reducer;

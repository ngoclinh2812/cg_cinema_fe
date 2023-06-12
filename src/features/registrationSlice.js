import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    loading: false,
    error: null,
    success: false,
};

const registrationSlice = createSlice({
    name: "registration",
    initialState,
    reducers: {
        registerStart(state) {
            state.loading = true;
            state.error = null;
            state.success = false;
        },
        registerSuccess(state) {
            state.loading = false;
            state.success = true;
        },
        registerFailure(state, action) {
            state.loading = false;
            state.error = action.payload.error;
        },
    },
});

export const { registerStart, registerSuccess, registerFailure } =
    registrationSlice.actions;

export default registrationSlice.reducer;

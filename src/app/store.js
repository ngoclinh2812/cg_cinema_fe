import { configureStore } from "@reduxjs/toolkit";
import moviesReducer from "../features/movieSlice";
import userReducer from "../features/userSlice";
import registrationReducer from "../features/registrationSlice";
import loginReducer from "../features/loginSlice";

const store = configureStore({
  reducer: {
    registration: registrationReducer,
    user: userReducer,
    login: loginReducer,
  },
});

export default store;
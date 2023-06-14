import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../features/userSlice";
import registrationReducer from "../features/registrationSlice";
import loginReducer from "../features/loginSlice";
import theaterReducer from "../features/theater/theaterSlice";
import movieReducer from "../components/movie/movieSlice";

const store = configureStore({
  reducer: {
    registration: registrationReducer,
    user: userReducer,
    login: loginReducer,
    movie: movieReducer,
    theater: theaterReducer,
  },
});

export default store;
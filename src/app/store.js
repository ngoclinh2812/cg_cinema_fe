import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../features/userSlice";
import registrationReducer from "../features/registrationSlice";
import loginReducer from "../features/loginSlice";
import theaterReducer from "../features/theater/theaterSlice";
import movieReducer from "../features/movie/movieSlice";
import ticketReducer from '../features/ticket/ticketSlice';

const store = configureStore({
  reducer: {
    registration: registrationReducer,
    user: userReducer,
    login: loginReducer,
    movie: movieReducer,
    theater: theaterReducer,
    ticket: ticketReducer
  },
});

export default store;
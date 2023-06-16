import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../features/userSlice";
import registrationReducer from "../features/registrationSlice";
import loginReducer from "../features/loginSlice";
import theaterReducer from "../features/theater/theaterSlice";
import movieSlice from "../components/movie/movieSlice";
import RoomReducer  from "../features/room/roomSlice";

const store = configureStore({
  reducer: {
    registration: registrationReducer,
    user: userReducer,
    login: loginReducer,
    movie: movieSlice,
    theater: theaterReducer,
    room: RoomReducer,
  },
});

export default store;
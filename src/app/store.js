import { configureStore } from '@reduxjs/toolkit'
import authReducer from '../features/auth/authSlice'
import { authApi } from '../api/authAPI'
import theaterReducer from "../features/theater/theaterSlice";
import movieSlice from "../components/movie/movieSlice";


const store = configureStore({
  reducer: {
    movie: movieSlice,
    auth: authReducer,
    theater: theaterReducer,
    [authApi.reducerPath]: authApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApi.middleware),
})

export default store

import { configureStore } from '@reduxjs/toolkit'
import authReducer from '../features/auth/authSlice'
import { authApi } from '../api/authAPI'
import movieSlice from "../components/movie/movieSlice";

const store = configureStore({
  reducer: {
    movie: movieSlice,
    auth: authReducer,
    [authApi.reducerPath]: authApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApi.middleware),
})

export default store

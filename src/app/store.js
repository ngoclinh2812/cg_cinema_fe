import { configureStore } from '@reduxjs/toolkit'
import authReducer from '../features/auth/authSlice'
import { authApi } from '../api/authAPI'
import theaterReducer from "../features/theater/theaterSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    theater: theaterReducer,
    [authApi.reducerPath]: authApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApi.middleware),
})

export default store

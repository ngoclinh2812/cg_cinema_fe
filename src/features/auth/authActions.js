import axios from 'axios'
import { createAsyncThunk } from '@reduxjs/toolkit'

const backendURL =
  process.env.NODE_ENV !== 'production'
    ? 'http://localhost:8080/api'
    : process.env.REACT_APP_SERVER_URL

export const userLogin = createAsyncThunk(
  'auth/login',
  async ({ email, password }, { rejectWithValue }) => {
    try {
      // configure header's Content-Type as JSON
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      }

      const { data } = await axios.post(
        `${backendURL}/sf/account/login`,
        { email, password },
        config
      )

      // store user's token in local storage
      localStorage.setItem('userToken', data)
      console.log(data);
      return data
    } catch (error) {
      // return custom error message from API if any
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message)
      } else {
        return rejectWithValue(error.message)
      }
    }
  }
)

export const registerUser = createAsyncThunk(
  'auth/register',
  async ({ username, lastName, firstName, email, phone, password }, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      }

      await axios.post(
        `${backendURL}/sf/account/signup`,
        { username, lastName, firstName, email, phone, password },
        config
      )
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message)
      } else {
        return rejectWithValue(error.message)
      }
    }
  }
)

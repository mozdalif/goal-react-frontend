import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'


const API_URL = '/api/users/'

export const loginThunk = createAsyncThunk('auth/login',
  async (data, thunkAPI) => {

    try {
      const res = await axios.post(API_URL + 'login', data)
      if (res?.data) {
        localStorage.setItem('user', JSON.stringify(res.data))
      }
      return res.data
    } catch (error) {
      const message = (error.response && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString()
      console.log(message);
      return thunkAPI.rejectWithValue(message)
    }
  }
)


export const registerThunk = createAsyncThunk('auth/register',
  async (data, thunkAPI) => {

    try {
      const res = await axios.post(API_URL, data)
      if (res?.data) {
        localStorage.setItem('user', JSON.stringify(res.data))
      }
      return res.data
    } catch (error) {
      const message = (error.response && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString()
      console.log(message);
      return thunkAPI.rejectWithValue(message)
    }
  }
)

export const logoutThunk = createAsyncThunk('auth/logout',
  async () => {
    localStorage.removeItem('user')
  }
)

// const authThunk = {
//   loginThunk,
//   registerThunk,
//   logoutThunk
// }

// export default authThunk
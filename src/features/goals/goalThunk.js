import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

const API_URL = '/api/goals/'


// Create new goal
export const createGoal = createAsyncThunk(
  'goals/create',
  async (goalData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }

      const response = await axios.post(API_URL, goalData, config)

      return response.data

    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)




// Get user goals
export const getGoals = createAsyncThunk(
  'goals/getAll',
  async (_, thunkAPI) => {
    try {
      const token = await thunkAPI.getState().auth.user?.token
      if (token) {
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }

        const response = await axios.get(API_URL, config)

        return response.data
      } else {
        // throw new Error('token not found')
      }


    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()
      console.log("lsdd" + message);
      return thunkAPI.rejectWithValue(message)
    }
  }
)

// Delete user goal
export const deleteGoal = createAsyncThunk(
  'goals/delete',
  async (id, thunkAPI) => {

    try {
      const token = thunkAPI.getState().auth.user.token


      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }

      const response = await axios.delete(API_URL + id, config)
      console.log(response);
      return response.data
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)

// const goalService = {
//   createGoal,
//   getGoals,
//   deleteGoal,
// }

// export default goalService

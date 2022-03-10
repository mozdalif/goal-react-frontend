import { createSlice } from '@reduxjs/toolkit'
import { loginThunk, registerThunk, logoutThunk } from './authThunk'

const user = JSON.parse(localStorage.getItem('user'))

const initialState = {
  user: user ? user : null,
  book: ["physics"],
  isLoading: false,
  isSuccess: false,
  isError: false,
  errMsg: ''
}


export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    reset: (state, action) => {
      state.isLoading = false
      state.isSuccess = false
      state.isError = false
      state.message = ''
    },
    add: (state, action) => {
      state.book.push(action.payload)
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginThunk.pending, (state) => {
        state.isLoading = true
      })
      .addCase(loginThunk.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.user = action.payload
      })
      .addCase(loginThunk.rejected, (state, action) => {
        state.isError = true
        state.isLoading = false
        state.user = null
        state.errMsg = action.payload
      })
      .addCase(registerThunk.pending, (state) => {
        state.isLoading = true
      })
      .addCase(registerThunk.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.user = action.payload
      })
      .addCase(registerThunk.rejected, (state, action) => {
        state.isError = true
        state.isLoading = false
        state.user = null
        state.errMsg = action.payload
      })
      .addCase(logoutThunk.fulfilled, (state) => {
        state.user = null
      })
  }
})




export { loginThunk, registerThunk, logoutThunk }
export const { reset, add } = authSlice.actions
export default authSlice.reducer
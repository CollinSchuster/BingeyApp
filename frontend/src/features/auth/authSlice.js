import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import authService from './authService'
// Get user from localStorage (localStorage can only have strings so you have to parse it)
const user = JSON.parse(localStorage.getItem('user'))

const initialState = {
  user: user ? user : null, 
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: ''
}

//Register User 
export const register = createAsyncThunk('auth/register', async(user,thunkAPI) => {
  try {
    return await authService.register(user)
  } catch (error) {
    const message = (error.response && error.response.data && error.data.message) || error.message || error.toString()
    return thunkAPI.rejectWithValue(message)
  }
})

//Login User 
export const login = createAsyncThunk('auth/login', async(user,thunkAPI) => {
  try {
    return await authService.login(user)
  } catch (error) {
    const message = (error.response && error.response.data && error.data.message) || error.message || error.toString()
    return thunkAPI.rejectWithValue(message)
  }
})

export const logout = createAsyncThunk('auth/logout', async () => {
  await authService.logout()
})

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false
      state.isSuccess = false
      state.isError = false
      state.message = ''
    }
  },
  extraReducers: (builder) => {
    builder  // builder is a callback 
      .addCase(register.pending, (state) => {
        state.isLoading = true
      })
      .addCase(register.fulfilled, (state,action) => {
        state.isLoading = false
        state.isSuccess = true
        state.user = action.payload
      })
      .addCase(register.rejected, (state,action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
        state.user = null
      })
      .addCase(logout.fulfilled, (state) => {
        state.user = null
        state.isError = false
        state.message = ''
      })
      .addCase(login.pending, (state) => {
        state.isLoading = true
      })
      .addCase(login.fulfilled, (state,action) => {
        state.isLoading = false
        state.isSuccess = true
        state.user = action.payload
      })
      .addCase(login.rejected, (state,action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
        state.user = null
      })
      
  },
})

export const {reset} = authSlice.actions // when you have a reducer you have to actually export it from authSlice.actions to bring reset into components
export default authSlice.reducer


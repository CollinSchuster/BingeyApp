import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import goalService from './goalService'

// createSlice: A function that accepts an initial state, an object of reducer functions, and a "slice name", and automatically generates action creators and action types that correspond to the reducers and state.

const initialState = {
  goals: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
}

//Create new goal 
export const createGoal = createAsyncThunk('goals/create', async (goalData, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.user.token
    return await goalService.createGoal(goalData, token)
  } catch (error) {
    const message = (error.response && error.response.data && error.data.message) || error.message || error.toString()
    return thunkAPI.rejectWithValue(message)
  }
})

//Get User Goals  (Thunk Function)
export const getGoals = createAsyncThunk('goals/getAll',async (_,thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.user.token
    return await goalService.getGoals(token)
  } catch(error) {
    const message = (error.response && error.response.data && error.data.message) || error.message || error.toString()
    return thunkAPI.rejectWithValue(message)
  }
})

// Delete user goal 
export const deleteGoal = createAsyncThunk('goals/delete', async (id, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.user.token
    return await goalService.deleteGoal(id, token)
  } catch (error) {
    const message = (error.response && error.response.data && error.data.message) || error.message || error.toString()
    return thunkAPI.rejectWithValue(message)
  }
})

export const goalSlice = createSlice({
  name: 'goal',
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder 
      .addCase(createGoal.pending, (state) => {
        state.isLoading = true
      })
      .addCase(createGoal.fulfilled, (state,action) => {
        state.isLoading = false
        state.isSuccess = true
        state.goals.push(action.payload) // only can do with redux toolkit
      })
      .addCase(createGoal.rejected, (state,action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(getGoals.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getGoals.fulfilled, (state,action) => {
        state.isLoading = false
        state.isSuccess = true
        state.goals = action.payload // only can do with redux toolkit
      })
      .addCase(getGoals.rejected, (state,action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(deleteGoal.pending, (state) => {
        state.isLoading = true
      })
      .addCase(deleteGoal.fulfilled, (state,action) => {
        state.isLoading = false
        state.isSuccess = true
        state.goals = state.goals.filter((goal) => goal._id !== action.payload.id) // need to do the id because it won't take it out of the UI unitl we reload if we jus do action.payload so we use the state of the data instead
      })
      .addCase(deleteGoal.rejected, (state,action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
  }
})

export const {reset} = goalSlice.actions
export default goalSlice.reducer
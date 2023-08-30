import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import bookmarkService from './bookmarkService'

// createSlice: A function that accepts an initial state, an object of reducer functions, and a "slice name", and automatically generates action creators and action types that correspond to the reducers and state.

const initialState = {
  bookmarks: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
}

//Create new bookmark
export const createBookmark = createAsyncThunk('bookmarks/create', async (bookmarkData, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.user.token
    return await bookmarkService.createBookmark(bookmarkData, token)
  } catch (error) {
    const message = (error.response && error.response.data && error.data.message) || error.message || error.toString()
    return thunkAPI.rejectWithValue(message)
  }
})

//Get User Bookmarks  (Thunk Function)
export const getBookmarks = createAsyncThunk('bookmarks/getAll',async (_,thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.user.token
    return await bookmarkService.getBookmarks(token)
  } catch(error) {
    const message = (error.response && error.response.data && error.data.message) || error.message || error.toString()
    return thunkAPI.rejectWithValue(message)
  }
})

// Delete user bookmark
export const deleteBookmark = createAsyncThunk('bookmarks/delete', async (id, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.user.token
    return await bookmarkService.deleteBookmark(id, token)
  } catch (error) {
    const message = (error.response && error.response.data && error.data.message) || error.message || error.toString()
    return thunkAPI.rejectWithValue(message)
  }
})

export const bookmarkSlice = createSlice({
  name: 'bookmark',
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder 
      .addCase(createBookmark.pending, (state) => {
        state.isLoading = true
      })
      .addCase(createBookmark.fulfilled, (state,action) => {
        state.isLoading = false
        state.isSuccess = true
        state.bookmarks.push(action.payload) // only can do with redux toolkit
      })
      .addCase(createBookmark.rejected, (state,action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(getBookmarks.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getBookmarks.fulfilled, (state,action) => {
        state.isLoading = false
        state.isSuccess = true
        state.bookmarks = action.payload // only can do with redux toolkit
      })
      .addCase(getBookmarks.rejected, (state,action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(deleteBookmark.pending, (state) => {
        state.isLoading = true
      })
      .addCase(deleteBookmark.fulfilled, (state,action) => {
        state.isLoading = false
        state.isSuccess = true
        state.bookmarks = state.bookmarks.filter((bookmark) => bookmark._id !== action.payload.id) // need to do the id because it won't take it out of the UI unitl we reload if we jus do action.payload so we use the state of the data instead
      })
      .addCase(deleteBookmark.rejected, (state,action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
  }
})

export const {reset} = bookmarkSlice.actions
export default bookmarkSlice.reducer
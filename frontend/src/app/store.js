import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice'
import goalReducer from '../features/goals/goalSlice'
import bookmarkReducer from '../features/bookmarks/bookmarkSlice'
import chatSlice from '../features/chat/chatSlice'
// import refreshSidebar from '../features/chat/refreshSidebar'


export const store = configureStore({
  reducer: {
    auth: authReducer,
    goals: goalReducer,
    bookmarks: bookmarkReducer,
    chatKey: chatSlice,
    // refreshKey: refreshSidebar,
  },
});

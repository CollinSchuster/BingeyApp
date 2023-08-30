import { createSlice } from "@reduxjs/toolkit";

export const chatSlice = createSlice({
  name: "themeSlice",
  initialState: true,
  reducers: {
    toggleTheme: (state) => {
      return (state = !state);
    },
  },
});

export const { toggleTheme } = chatSlice.actions;
export default chatSlice.reducer;
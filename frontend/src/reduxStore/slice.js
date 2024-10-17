import { createSlice } from "@reduxjs/toolkit";

const openSlice = createSlice({
  name: "isOpen",
  initialState: {
    isOpen: true,
  },
  reducers: {
    openHandler: (state, action) => {
      console.log(action.payload);
      state.isOpen = action.payload;
    },
  },
});

export const { openHandler } = openSlice.actions;
export default openSlice.reducer;

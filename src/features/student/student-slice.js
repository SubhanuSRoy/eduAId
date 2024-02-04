import { createSlice } from "@reduxjs/toolkit";

const studentSlice = createSlice({
  name: "student",
  initialState: {
    currentStudent: null,
  },
  reducers: {
    addStudent: (state, action) => {
      state.currentStudent = action.payload;
    },
    removeStudent: (state) => {
      state.currentStudent = null;
    },
  },
});

export const studentActions = studentSlice.actions;
export default studentSlice;

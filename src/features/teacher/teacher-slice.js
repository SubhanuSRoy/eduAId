import { createSlice } from "@reduxjs/toolkit";

const teacherSlice = createSlice({
  name: "teacher",
  initialState: {
    currentTeacher: null,
  },
  reducers: {
    addTeacher: (state, action) => {
      state.currentTeacher = action.payload;
    },
    removeTeacher: (state) => {
      state.currentTeacher = null;
    },
  },
});

export const teacherActions = teacherSlice.actions;
export default teacherSlice;

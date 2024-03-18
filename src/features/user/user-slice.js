import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    isLoggedIn: false,
    userType: null,
    user: null,
    rTabNo: 0
  },
  reducers: {
    addUser(state, action) {
      state.user = action.payload;
      state.isLoggedIn = true;
    },
    login(state,action) {
      state.isLoggedIn = true;
      state.user = action.payload.user;
      state.userType = action.payload.userType;
    },
    logout(state) {
      state.isLoggedIn = false;
      state.empID = null
      state.password = null
      state.userType = null
    },
    setUserType(state, action) {
      state.userType = action.payload;
    },
    setRTabNo(state,action)
    {
      state.rTabNo = action.payload
    }
  },
});

export const userActions = userSlice.actions;

export default userSlice;

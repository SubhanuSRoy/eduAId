import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    isLoggedIn: false,
    userType: null,
    password: null,
    empID: null,
    rTabNo: 0
  },
  reducers: {
    login(state,action) {
      state.isLoggedIn = true;
      state.empID = action.payload.empID;
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

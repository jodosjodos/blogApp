import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    isLoggedIn: false,
    userData:{}
  },
  reducers: {
    login: (state,action) => {
      state.isLoggedIn = true;
      localStorage.setItem("logged?",state.isLoggedIn)
      if (action) {
        const data = action.payload.json;
       state.userData=data
      }
    },
    logout: (state) => {
      state.isLoggedIn = false;
      localStorage.setItem("logged?",state.isLoggedIn)
    },
  },
});

export const authActions = authSlice.actions;

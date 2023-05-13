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
      if (action) {
        const data = action.payload.json;
       state.userData=data
      }
    },
    logout: (state) => {
      state.isLoggedIn = false;
    },
  },
});

export const authActions = authSlice.actions;

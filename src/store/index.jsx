import {configureStore} from "@reduxjs/toolkit"
import { authSlice } from "./reducers/authSlice"
import { modeSlice } from "./reducers/mode"
import { navSlice } from "./reducers/navVisibilySlice"
import {userReducer} from "./reducers/userReducer"

let userInfoFromStorage = null;
const storedAccount = localStorage.getItem('account');
if (storedAccount !== null) {
  try {
    userInfoFromStorage = JSON.parse(storedAccount);
  } catch (error) {
    // Handle parsing error, e.g., log the error or show a default value
    console.log(error);
  }
}


const initialState={
    user:{userInfo:userInfoFromStorage}
}

export const store=configureStore({
    reducer:{
        auth:authSlice.reducer,
        mode:modeSlice.reducer,
        navVisibility:navSlice.reducer,
        user:userReducer
    },
    preloadedState:initialState
})

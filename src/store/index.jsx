import {configureStore} from "@reduxjs/toolkit"
import { authSlice } from "./reducers/authSlice"
import { modeSlice } from "./reducers/mode"
import { navSlice } from "./reducers/navVisibilySlice"
import {userReducer} from "./reducers/userReducer"

const userInfoFromStorage=localStorage.getItem("account")?JSON.parse(localStorage.getItem("account")):null;

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

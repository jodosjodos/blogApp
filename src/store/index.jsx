import {configureStore} from "@reduxjs/toolkit"
import { authSlice } from "./authSlice"
import { modeSlice } from "./mode"
export const store=configureStore({
    reducer:{
        auth:authSlice.reducer,
        mode:modeSlice.reducer
    }
})

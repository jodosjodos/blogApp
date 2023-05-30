import { createSlice } from "@reduxjs/toolkit";

export const navSlice=createSlice({
    name:"navVisibility",
    initialState:{
        navVisibility:false
    },
    reducers:{
        changeNav:(state)=>{
       state.navVisibility=!state.navVisibility
        }
    }
})

export const navVisibilityActions=navSlice.actions
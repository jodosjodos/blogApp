import { createSlice } from "@reduxjs/toolkit";

const getInitialMode = () => {
    const storedMode = localStorage.getItem("mode");
    
    return storedMode ? storedMode : "dark";
  };

export const modeSlice = createSlice({
  name: "mode",
  initialState: {
    mode: getInitialMode()
  },
  reducers: {
    changeMode: (state) => {
      state.mode = state.mode === "dark" ? "light" : "dark";
      localStorage.setItem("mode", state.mode);
      console.log(state.mode);
    },
  },
});

export const modeActions = modeSlice.actions;

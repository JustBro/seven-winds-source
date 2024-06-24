import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

const initialState = {
  sidebarHide: false,
};

export const uiSlice = createSlice({
  name: "main",
  initialState,
  reducers: {
    setSidebarHide: (state, action: PayloadAction<boolean>) => {
      state.sidebarHide = action.payload;
    },
  },
});

export const { setSidebarHide } = uiSlice.actions;

export const uiReducer = uiSlice.reducer;

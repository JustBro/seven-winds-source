import { configureStore } from "@reduxjs/toolkit";
import { uiReducer } from "./ui-slice";
import { outlayRowsReducer } from "./outlay-rows-slice";

export const store = configureStore({
  reducer: {
    uiReducer: uiReducer,
    outlayRowsReducer: outlayRowsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

import { configureStore } from '@reduxjs/toolkit';
import { uiReducer } from './UiSlice.service';
import { outlayRowsReducer } from './OutlayRowsSlice.service';

export const store = configureStore({
  reducer: {
    uiReducer: uiReducer,
    outlayRowsReducer: outlayRowsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

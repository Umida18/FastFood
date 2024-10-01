import { configureStore } from "@reduxjs/toolkit";
import xaritaReducer from "./slices/xaritaSlice";
import yetkazishNSlice from "./slices/yetkazishNSlice";
import categorySlice from "./slices/kategoriya";

const store = configureStore({
  reducer: {
    xarita: xaritaReducer,
    yetkazishNarxi: yetkazishNSlice,
    categories: categorySlice,
  },
});

// Store turlarini eksport qilish
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;

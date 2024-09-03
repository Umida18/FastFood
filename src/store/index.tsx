import { configureStore } from "@reduxjs/toolkit";
import categoryReducer from "./slices/kategoriya";

const store = configureStore({
  reducer: {
    categories: categoryReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export default store;

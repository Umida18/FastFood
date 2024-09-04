import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Narx } from "../../pages/YetkazishNarxi";

const yetkazishNarxiSlice = createSlice({
  name: "yetkazishNarxi",
  initialState: {
    yetkazishNarxi: [],
  },
  reducers: {
    setYetkazishNarxi: (
      state: {
        yetkazishNarxi: Narx[];
      },
      action: PayloadAction<Narx[]>
    ) => {
      state.yetkazishNarxi = action.payload;
    },
  },
});

export const { setYetkazishNarxi } = yetkazishNarxiSlice.actions;
export default yetkazishNarxiSlice.reducer;

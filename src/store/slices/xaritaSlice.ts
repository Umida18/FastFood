import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Filial } from "../../type/type";

const xaritaSlice = createSlice({
  name: "xarita",
  initialState: {
    xarita: [],
  },
  reducers: {
    setXarita: (
      state: {
        xarita: Filial[];
      },
      action: PayloadAction<Filial[]>
    ) => {
      state.xarita = action.payload;
    },
  },
});

export const { setXarita } = xaritaSlice.actions;
export default xaritaSlice.reducer;

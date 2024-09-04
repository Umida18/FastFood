import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Branch } from "../../pages/filiallar/filiallar";

const xaritaSlice = createSlice({
  name: "xarita",
  initialState: {
    xarita: [],
  },
  reducers: {
    setXarita: (
      state: {
        xarita: Branch[];
      },
      action: PayloadAction<Branch[]>
    ) => {
      state.xarita = action.payload;
    },
  },
});

export const { setXarita } = xaritaSlice.actions;
export default xaritaSlice.reducer;

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Category } from "../../pages/kategoriyalar/kategoriyalar";

const categorySlice = createSlice({
  name: "kategoriya",
  initialState: {
    kategoriya: [],
  },
  reducers: {
    setCategory: (
      state: { kategoriya: Category[] },
      action: PayloadAction<Category[]>
    ) => {
      state.kategoriya = action.payload;
    },
  },
});

export const { setCategory } = categorySlice.actions;
export default categorySlice.reducer;

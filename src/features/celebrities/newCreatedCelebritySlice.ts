import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface IState {
  value: boolean;
}

const initialState: IState = {
  value: false,
};

export const newCreatedSlice = createSlice({
  name: "newCreated",
  initialState,
  reducers: {
    setNewCreated: (state, action: PayloadAction<boolean>) => {
      state.value = action.payload;
    },
  },
});

export const { setNewCreated } = newCreatedSlice.actions;
export default newCreatedSlice.reducer;

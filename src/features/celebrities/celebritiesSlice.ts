import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

import { ICelebrity, ICelebrityState } from "../../types/Celebrity";

const initialState: ICelebrityState = {
  value: [],
};

export const celebritiesSlice = createSlice({
  name: "celebrities",
  initialState,
  reducers: {
    setData: (state, action: PayloadAction<ICelebrity[]>) => {
      state.value = action.payload;
    },
  },
});

export const { setData } = celebritiesSlice.actions;
export default celebritiesSlice.reducer;

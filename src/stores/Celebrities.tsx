import { configureStore } from "@reduxjs/toolkit";

import celebritiesReducer from "../features/celebrities/celebritiesSlice";
import newCreatedReducer from "../features/celebrities/newCreatedCelebritySlice";

const store = configureStore({
  reducer: {
    celebrities: celebritiesReducer,
    newCreated: newCreatedReducer,
  },
});

export const celebritiesSelector = (state: RootState) =>
  state.celebrities.value;
export const newCreatedSelector = (state: RootState) => state.newCreated.value;
type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;

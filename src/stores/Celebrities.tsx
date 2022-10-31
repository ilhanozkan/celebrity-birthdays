import { configureStore } from "@reduxjs/toolkit";
import celebritiesReducer from "../features/celebrities/celebritiesSlice";

const store = configureStore({
  reducer: { celebrities: celebritiesReducer },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;

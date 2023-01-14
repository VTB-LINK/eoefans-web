import { configureStore } from "@reduxjs/toolkit";
import device from "./device";
import ActiveTags from "./tags";
const store = configureStore({
  reducer: {
    device,
    ActiveTags,
  },
});
export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

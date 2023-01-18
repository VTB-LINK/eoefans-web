import { configureStore } from "@reduxjs/toolkit";
import device from "./device";
import ActiveTags from "./tags";
import loading from "./loading";
const store = configureStore({
  reducer: {
    device,
    ActiveTags,
    loading,
  },
});
export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

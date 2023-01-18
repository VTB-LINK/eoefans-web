import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import type { RootState } from "..";

interface LoadingState {
  /**
   * @description 视频接口是否正在获取
   */
  videoIsLoading: boolean;
}
interface IchangeLoadingItem {
  stateName: keyof LoadingState;
  Tostate?: boolean;
}

const initialState: LoadingState = {
  videoIsLoading: true,
};
export const LoadingSlice = createSlice({
  name: "loading",
  initialState,
  reducers: {
    /**
     *
     */
    changeLoading: (state, action: PayloadAction<IchangeLoadingItem>) => {
      const { stateName, Tostate } = action.payload;
      if (typeof action.payload.Tostate === "boolean") {
        state[stateName] = Tostate as boolean;
      } else {
        state[stateName] = !state[stateName];
      }
    },
  },
});

export const { changeLoading } = LoadingSlice.actions;
export const selectVideoLoadingState = (state: RootState) =>
  state.loading.videoIsLoading;

export default LoadingSlice.reducer;

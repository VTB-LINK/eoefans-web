import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import type { RootState } from "..";

interface LoadingState {
  /**
   * @description 视频接口是否正在获取
   */
  videoIsLoading: boolean;
  /**
   * @description 图片接口是否正在获取
   */
  photoIsloading: boolean;
}
interface IchangeLoadingItem {
  stateName: keyof LoadingState;
  Tostate?: boolean;
}

const initialState: LoadingState = {
  videoIsLoading: true,
  photoIsloading: true,
};
export const LoadingSlice = createSlice({
  name: "loading",
  initialState,
  reducers: {
    /**
     * @description 修改加载状态，注意因为spa的限制所有每个页面只有一种加载情况
     */
    changeLoading: (state, action: PayloadAction<IchangeLoadingItem>) => {
      const { stateName, Tostate } = action.payload;
      if (typeof action.payload.Tostate === "boolean") {
        state[stateName] = Tostate as boolean;
      } else {
        state[stateName] = !state[stateName];
      }
    },
    /**
     * @description 此reducer应该只在url修改时调用
     */
    changeLoadingCauseByUrl: (
      state,
      action: PayloadAction<IchangeLoadingItem>
    ) => {
      Object.keys(state).map((name) => {
        state[name as keyof LoadingState] =
          name === action.payload.stateName ? true : false;
      });
    },
  },
});

const selectLoadingState = (state: RootState, name: keyof LoadingState) =>
  state.loading[name];

export const { changeLoading, changeLoadingCauseByUrl } = LoadingSlice.actions;
export const selectVideoLoadingState = (state: RootState) =>
    selectLoadingState(state, "videoIsLoading"),
  selectPhotoLoadingState = (state: RootState) =>
    selectLoadingState(state, "photoIsloading");

export default LoadingSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";

import type { RootState } from "..";

interface DeviceState {
  /**
   * @description nav栏是否展开
   */
  navMoreShowed: boolean;
}
const initialState: DeviceState = {
  navMoreShowed: false,
};
export const DeviceSlice = createSlice({
  name: "device",
  initialState,
  reducers: {
    /**
     * @description 修改nav列表展开情况
     */
    changeNavMoreShowed: (state) => {
      state.navMoreShowed = !state.navMoreShowed;
    },
  },
});

export const { changeNavMoreShowed } = DeviceSlice.actions;
/**
 * @description 获取nav是否展开
 */
export const selectNavMoreShowed = (state: RootState) =>
  state.device.navMoreShowed;

export default DeviceSlice.reducer;

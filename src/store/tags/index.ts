import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { NavQueryItemType } from "@routers/layout/nav/tools";

import type { RootState } from "..";

interface TagStates {
  /**
   * @description 用户点击的tag栏
   */
  activeTags: NavQueryItemType[];
}
const initialState: TagStates = {
  activeTags: [],
};
export const ActiveTagsSlice = createSlice({
  name: "activeTags",
  initialState,
  reducers: {
    /**
     * @description 添加tag
     */
    handerAddTag: (state, action: PayloadAction<NavQueryItemType>) => {
      //这里需要注意的是queryType有三种，只有q可以同存.
      switch (action.payload.queryType) {
        case "q":
          break;

        default:
          state.activeTags = state.activeTags.filter(
            (item) => item.queryType !== action.payload.queryType
          );
          break;
      }
      state.activeTags = [...state.activeTags, action.payload];
    },
    /**
     * @description 删除tag
     */
    handerDeleteTag: (state, action: PayloadAction<NavQueryItemType>) => {
      state.activeTags = state.activeTags.filter(
        (item) => item.id !== action.payload.id
      );
    },
  },
});

export const { handerAddTag, handerDeleteTag } = ActiveTagsSlice.actions;

export const selectActiveTags = (state: RootState) =>
  state.ActiveTags.activeTags;
export default ActiveTagsSlice.reducer;

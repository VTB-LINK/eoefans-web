import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { NavQueryItemType } from "@routers/layout/nav/tools";

import type { RootState } from "..";

interface TagStates {
  /**
   * @description video页面点击tags
   */
  VideoActiveTags: NavQueryItemType[];
}
const initialState: TagStates = {
  VideoActiveTags: [],
};
export const ActiveTagsSlice = createSlice({
  name: "VideoActiveTags",
  initialState,
  reducers: {
    /**
     * @description video页面添加tag
     */
    handerVideoAddTag: (state, action: PayloadAction<NavQueryItemType>) => {
      //这里需要注意的是queryType多种，只有q可以同存.
      switch (action.payload.queryType) {
        case "q":
          break;

        default:
          state.VideoActiveTags = state.VideoActiveTags.filter(
            (item) => item.queryType !== action.payload.queryType
          );
          break;
      }
      state.VideoActiveTags = [...state.VideoActiveTags, action.payload];
    },
    /**
     * @description video页面删除tag
     */
    handerVideoDeleteTag: (state, action: PayloadAction<NavQueryItemType>) => {
      state.VideoActiveTags = state.VideoActiveTags.filter(
        (item) => item.id !== action.payload.id
      );
    },
  },
});

export const { handerVideoAddTag, handerVideoDeleteTag } =
  ActiveTagsSlice.actions;

export const selectVideoActiveTags = (state: RootState) =>
  state.ActiveTags.VideoActiveTags;
export default ActiveTagsSlice.reducer;

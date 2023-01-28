import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  VideoNavQueryItemType,
  VideoQueryNavList,
} from "@routers/layout/nav/VideoTools";
import {
  PhotoNavQueryItemType,
  PhotoQueryNavList,
} from "@routers/layout/nav/photoTools";
import type { RootState } from "..";

const Photo_Topic_id_all = PhotoQueryNavList.find(
    (item) => item.queryString === 0
  )!,
  Photo_type_default = PhotoQueryNavList.find(
    (item) => item.queryString === "latest"
  )!,
  Video_default_show = VideoQueryNavList.find(
    (item) => item.queryString === "pubdate"
  )!;

interface TagStates {
  /**
   * @description video页面点击tags
   */
  VideoActiveTags: VideoNavQueryItemType[];
  /**
   * @description photo page active tags
   */
  PhotoActivetags: PhotoNavQueryItemType[];
}
const initialState: TagStates = {
  VideoActiveTags: [Video_default_show],
  PhotoActivetags: [Photo_Topic_id_all, Photo_type_default],
};
export const ActiveTagsSlice = createSlice({
  name: "VideoActiveTags",
  initialState,
  reducers: {
    /**
     * @description video页面添加tag
     */
    handerVideoAddTag: (
      state,
      action: PayloadAction<VideoNavQueryItemType>
    ) => {
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
     * @description photo page add activeTags
     */
    handerPhotoAddTag: (
      state,
      action: PayloadAction<PhotoNavQueryItemType>
    ) => {
      state.PhotoActivetags = state.PhotoActivetags.filter(
        (item) => item.queryType !== action.payload.queryType
      );
      state.PhotoActivetags.push(action.payload);
    },
    /**
     * @description video页面删除tag
     */
    handerVideoDeleteTag: (
      state,
      action: PayloadAction<VideoNavQueryItemType>
    ) => {
      state.VideoActiveTags = state.VideoActiveTags.filter(
        (item) => item.id !== action.payload.id
      );
    },
    /**
     * @description photo page delete activetags
     */
    handerPhotoDeleteTag: (
      state,
      action: PayloadAction<PhotoNavQueryItemType>
    ) => {
      state.PhotoActivetags = state.PhotoActivetags.filter(
        (item) => item.id !== action.payload.id
      );
      if (
        !state.PhotoActivetags.some(
          (item) => item.queryType === action.payload.queryType
        )
      ) {
        switch (action.payload.queryType) {
          case "topic_id": {
            state.PhotoActivetags.push(Photo_Topic_id_all);
            break;
          }
          default: {
            state.PhotoActivetags.push(Photo_type_default);
            break;
          }
        }
      }
    },
  },
});

export const {
  handerVideoAddTag,
  handerVideoDeleteTag,
  handerPhotoAddTag,
  handerPhotoDeleteTag,
} = ActiveTagsSlice.actions;

export const selectVideoActiveTags = (state: RootState) =>
    state.ActiveTags.VideoActiveTags,
  selectPhotoActiveTags = (state: RootState) =>
    state.ActiveTags.PhotoActivetags;
export default ActiveTagsSlice.reducer;

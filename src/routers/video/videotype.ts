/**
 * 定义video路由的类型
 */
import { ImageProps } from "@components/image/imagetype";
import { RFetchVideoRes } from "@utils/fetch/fetchtype";

/**
 * @description video路由瀑布流卡片参数
 */
export type VideoRouterImageCardType = Pick<
  RFetchVideoRes["data"]["result"][number],
  | "bvid"
  | "name"
  | "tname"
  | "copyright"
  | "title"
  | "pic"
  | "tag"
  | "view"
  | "coin"
  | "share"
  | "like"
  | "pubdate"
  | "danmaku"
  | "duration"
  | "favorite"
  | "face"
> &
  Omit<ImageProps, "url">;

export type VideoRouterMasonryType = {};

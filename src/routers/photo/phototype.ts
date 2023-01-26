import { IFetchPhotoParams } from "@utils/fetch/fetchtype";
export type basicImageType = {
  src: string;
  width: number;
  height: number;
};
/**
 * 定义photo路由的类型
 */
export type PhotoRouterImageCardType = {
  images: basicImageType[];
  observer?: boolean;
  callback?: (inView: boolean) => void;
};

export type PhotoRouterMasonryType = IFetchPhotoParams;

import message from "@components/message";
import { fetchPhotos } from "@utils/fetch";
import { IFetchPhotoParams } from "@utils/fetch/fetchtype";

export const fetchPhotoHandler = async (params: IFetchPhotoParams) => {
  const res = await fetchPhotos(params);
  if (res.code !== 0) {
    res.code === 400 && message.info("参数错误,请尝试其他tag");
    res.code === 500 && message.info(res.message);
    return [];
  } else if (res.data.result == null || res.data.result.length < 1) {
    message.info("没有更多数据了,请尝试其他tag");
    return [];
  }
  return res.data.result;
};

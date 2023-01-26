import { VideoRouterMasonryType, VideoRouterImageCardType } from "./videotype";
import { fetchVideos } from "@utils/fetch/index";
import message from "@components/message";
import { Pick } from "@utils/index";

export const fetchVideohandler = async (
  page: number = 1,
  props: VideoRouterMasonryType
) => {
  const res = await fetchVideos({
    order: "score",
    ...props,
    page,
  });

  if (res.code !== 0) {
    res.code === 400 && message.info("参数错误,请尝试其他tag");
    res.code === 500 && message.info(res.message);
    return [];
  } else if (res.data.result.length < 1) {
    message.info("没有更多数据了,请尝试其他tag");
  }
  return res.data.result;
};

export function PickVideoRouterImageCardType<
  T extends VideoRouterImageCardType
>(item: T): VideoRouterImageCardType {
  return Pick(
    item,
    "title",
    "bvid",
    "name",
    "tname",
    "copyright",
    "pic",
    "tag",
    "view",
    "coin",
    "share",
    "like",
    "pubdate",
    "danmaku",
    "duration",
    "favorite",
    "face"
  );
}

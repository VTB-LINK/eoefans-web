import { VideoRouterMasonryType, VideoRouterImageCardType } from "./videotype";
import { fetchVideos } from "@utils/fetch/index";
import message from "@components/message";
import { Pick } from "@utils/index";

export const fetchVideohnadler = async (
  page: number = 1,
  props: VideoRouterMasonryType
) => {
  const res = await fetchVideos({
    order: "view",
    ...props,
    page,
  });
  if (res.code === 400) {
    message.info("参数错误,请尝试其他tag");
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

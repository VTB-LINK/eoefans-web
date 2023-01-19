import { useAppSelector } from "@store/hooks";
import { selectActiveTags } from "@store/tags";
import VideoMasonry from "./masonry";
import { VideoRouterMasonryType } from "./videotype";

type ValueOf<T> = T[keyof T];
export default function VideoPage() {
  //处理搜索条件
  const activeTags = useAppSelector(selectActiveTags),
    tname = activeTags.find((item) => item.queryType === "tname")
      ?.queryString as ValueOf<Pick<VideoRouterMasonryType, "tname">>,
    copyright = activeTags.find((item) => item.queryType === "copyright")
      ?.queryString as ValueOf<Pick<VideoRouterMasonryType, "copyright">>,
    order = activeTags.find((item) => item.queryType === "order")
      ?.queryString as ValueOf<Pick<VideoRouterMasonryType, "order">>,
    q_not_tag = activeTags
      .filter((item) => item.queryType === "q")
      .reduceRight((pre, cur, index, arr) => {
        return `${cur.queryString}${index < arr.length - 1 ? "+" : ""}${pre}`;
      }, ""),
    q = q_not_tag.length > 1 ? `tag.${q_not_tag}` : q_not_tag,
    props = { tname, copyright, order, q };
  return (
    <>
      <VideoMasonry {...props} />
    </>
  );
}

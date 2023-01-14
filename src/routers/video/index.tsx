import { useAppSelector } from "@store/hooks";
import { selectActiveTags } from "@store/tags";
import VideoMasonry from "./masonry";
import { VideoRouterMasonryType } from "./videotype";

type ValueOf<T> = T[keyof T];
export default function VideoPage() {
  const activeTags = useAppSelector(selectActiveTags),
    tname = activeTags.find((item) => item.queryType === "tname")
      ?.queryString as ValueOf<Pick<VideoRouterMasonryType, "tname">>,
    copyright = activeTags.find((item) => item.queryType === "copyright")
      ?.queryString as ValueOf<Pick<VideoRouterMasonryType, "copyright">>,
    q = activeTags
      .filter((item) => item.queryType === "q")
      .reduceRight((pre, cur) => {
        return `${cur.queryString}+${pre}`;
      }, "");
  return (
    <>
      <VideoMasonry tname={tname} copyright={copyright} />
    </>
  );
}
//todo 重新写q

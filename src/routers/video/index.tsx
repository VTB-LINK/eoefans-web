import VideoMasonry from "./masonry";
import { useTagsSelected } from "@components/proview/tagSelect";
export default function VideoPage() {
  const { tags } = useTagsSelected(),
    qlists = tags
      .filter((item) => item.queryType === "q")
      .reduceRight((pre, cur) => {
        return `${cur.queryString}+${pre}`;
      }, ""),
    q = qlists.length < 1 ? undefined : `tag.${qlists}`;
  return (
    <>
      <VideoMasonry q={q} />
    </>
  );
}
//todo 优化搜索设置
//todo 添加上拉刷新

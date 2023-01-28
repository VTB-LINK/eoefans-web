import Masonry from "./masonry";
import { useAppSelector } from "@store/hooks";
import { selectPhotoActiveTags } from "@store/tags";
import {
  PhotoSearchType,
  PhotoTopicType,
} from "@routers/layout/nav/photoTools";

export default function PhotoPage() {
  const activeTags = useAppSelector(selectPhotoActiveTags),
    typeitem = activeTags.find(
      (item) => item.queryType === "type"
    )! as PhotoSearchType,
    topicItem = activeTags.find(
      (item) => item.queryType === "topic_id"
    ) as PhotoTopicType;

  return (
    <>
      <Masonry type={typeitem.queryString} topic_id={topicItem.queryString} />
    </>
  );
}

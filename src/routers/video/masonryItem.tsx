import Image from "@components/image";
import { FC } from "react";
import SlowMotionVideoSharpIcon from "@mui/icons-material/SlowMotionVideoSharp";
import SubjectSharpIcon from "@mui/icons-material/SubjectSharp";
import Link from "@mui/material/Link";
import { VideoRouterImageCardType } from "./videotype";
import getrealtiveTime, { getVideoTime } from "@utils/time";
import styles from "./video.module.less";
import { Omit, Pick } from "@utils/index";

export const VideoRouterImageCard: FC<{ data: VideoRouterImageCardType }> = ({
  data,
}) => {
  const { pic, bvid } = data;
  return (
    <section className='element-item'>
      <Link
        target='_blank'
        href={`https://www.bilibili.com/video/${bvid}`}
        underline='none'
        color='inherit'
      >
        <Image
          url={pic}
          {...Omit(
            data,
            "pic",
            "bvid",
            "name",
            "tname",
            "title",
            "tag",
            "view",
            "coin",
            "share",
            "like",
            "updated_at",
            "danmaku",
            "duration"
          )}
        >
          {/* todo:lost tag */}
          <VideoData {...Pick(data, "view", "danmaku", "duration")} />
        </Image>
      </Link>
      <VideoInfo {...Pick(data, "title", "name", "updated_at", "bvid")} />
    </section>
  );
};
const VideoData: FC<
  Pick<VideoRouterImageCardType, "view" | "danmaku" | "duration">
> = (props) => {
  const { view, danmaku, duration } = props;
  return (
    <div className={styles["video-data"]}>
      <div className={styles["video-data-left"]}>
        <span title='播放量'>
          <SlowMotionVideoSharpIcon fontSize='small' />
          {view}
        </span>
        <span title='弹幕数'>
          <SubjectSharpIcon fontSize='small' />
          {danmaku}
        </span>
      </div>
      <span title='视频时长'>{getVideoTime(duration)}</span>
    </div>
  );
};
const VideoInfo: FC<
  Pick<VideoRouterImageCardType, "title" | "name" | "updated_at" | "bvid">
> = (props) => {
  const { title, name, bvid, updated_at } = props;
  return (
    <div className={styles["video-info"]}>
      <p title={title}>
        <Link
          target='_blank'
          href={`https://www.bilibili.com/video/${bvid}`}
          underline='none'
          color='inherit'
        >
          {title}
        </Link>
      </p>
      <div className={styles["video-up-info"]}>
        <Link underline='none' color='inherit'>
          <span title={name}>{name}</span>
          <span>{getrealtiveTime(updated_at * 1000)}</span>
        </Link>
      </div>
    </div>
  );
};
// 1-6 todo：写完视频页面展示瀑布图

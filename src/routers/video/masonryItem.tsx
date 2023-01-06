import Image from "@components/image";
import { FC } from "react";
import SlowMotionVideoSharpIcon from "@mui/icons-material/SlowMotionVideoSharp";
import SubjectSharpIcon from "@mui/icons-material/SubjectSharp";
import ThumbUpSharpIcon from "@mui/icons-material/ThumbUpSharp";
import FavoriteSharpIcon from "@mui/icons-material/FavoriteSharp";
import { Link, Avatar } from "@mui/material";
import { VideoRouterImageCardType } from "./videotype";
import getrealtiveTime, { getVideoTime } from "@utils/time";
import styles from "./video.module.less";
import { Omit, Pick } from "@utils/index";
import getFixedNumber from "../../utils/number/index";

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
          <VideoData {...Pick(data, "view", "danmaku", "duration")} />
        </Image>
      </Link>
      <VideoInfo
        {...Pick(
          data,
          "title",
          "name",
          "updated_at",
          "bvid",
          "coin",
          "favorite",
          "like",
          "face"
        )}
      />
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
  Pick<
    VideoRouterImageCardType,
    | "title"
    | "name"
    | "updated_at"
    | "bvid"
    | "coin"
    | "favorite"
    | "like"
    | "face"
  >
> = (props) => {
  const { title, name, bvid, updated_at, coin, like, favorite, face } = props;
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
      <div className={styles["video-up"]}>
        <Avatar alt={name} src={face} />
        <div className={styles["video-up-desc"]}>
          <Link underline='none' color='inherit'>
            <span title={name}>{name}</span>
            <span>{getrealtiveTime(updated_at * 1000)}</span>
          </Link>
          <div className={styles["video-up-desc-data"]}>
            <span title='点赞数'>
              <ThumbUpSharpIcon fontSize='small' htmlColor='#707070' />{" "}
              {getFixedNumber(like)}
            </span>
            <span title='硬币数'>
              <CoinIcon height={"1.25rem"} /> {getFixedNumber(coin)}
            </span>
            <span title='收藏数'>
              <FavoriteSharpIcon fontSize='small' htmlColor='#707070' />{" "}
              {getFixedNumber(favorite)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
// 1-6 todo：写完视频页面展示瀑布图

export const CoinIcon: FC<{
  height: number | string;
  width?: number | string;
}> = ({ height, width = height }) => (
  <svg fill='none' viewBox='0 0 24 24' height={height} width={width}>
    <path
      fillRule='evenodd'
      clipRule='evenodd'
      d='M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm3.25 4.75a.75.75 0 010 1.5h-2.5v1.29c1.117.125 2.062.539 2.761 1.253.849.867 1.239 2.077 1.239 3.457v.5a.75.75 0 01-1.5 0v-.5c0-1.105-.31-1.895-.81-2.407-.383-.39-.934-.678-1.69-.79V17a.75.75 0 01-1.5 0v-5.947c-.756.112-1.307.4-1.69.79-.5.512-.81 1.302-.81 2.407v.5a.75.75 0 01-1.5 0v-.5c0-1.38.39-2.59 1.239-3.457.7-.714 1.644-1.128 2.761-1.252V8.25h-2.5a.75.75 0 010-1.5h6.5z'
      fill='#707070'
    />
  </svg>
);

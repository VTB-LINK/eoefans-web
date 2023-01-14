import { ImageBasic } from "@components/image";
import { FC } from "react";
import { Link } from "@mui/material";
import { VideoRouterImageCardType } from "../videotype";
import styles from "./item.module.less";
import { Omit, Pick } from "@utils/index";
import { VideoData } from "./videodata";
import { VideoInfo } from "./videoinfo";

export const VideoRouterImageCard: FC<{ data: VideoRouterImageCardType }> = ({
  data,
}) => {
  const { pic, bvid } = data;
  return (
    <section className={styles["video-section"]}>
      <Link
        target='_blank'
        href={`https://www.bilibili.com/video/${bvid}`}
        underline='none'
        color='inherit'
      >
        <ImageBasic
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
            "pubdate",
            "danmaku",
            "duration"
          )}
        >
          <VideoData {...Pick(data, "view", "danmaku", "duration")} />
        </ImageBasic>
      </Link>
      <VideoInfo
        {...Pick(
          data,
          "title",
          "name",
          "pubdate",
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

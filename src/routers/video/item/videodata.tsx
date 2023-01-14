import { useScreenSize } from "@components/proview/screenSize";
import SlideshowIcon from "@mui/icons-material/Slideshow";
import SubjectSharpIcon from "@mui/icons-material/SubjectSharp";
import { styled } from "@mui/material";
import getFixedNumber from "@utils/number";
import { getVideoTime } from "@utils/time";
import { FC } from "react";
import { VideoRouterImageCardType } from "../videotype";
import styles from "./item.module.less";
export const VideoData: FC<
  Pick<VideoRouterImageCardType, "view" | "danmaku" | "duration">
> = (props) => {
  const { view, danmaku, duration } = props;
  return (
    <div className={styles["video-data"]}>
      <div className={styles["video-data-left"]}>
        <SizeSpan title='播放量'>
          <SlideshowIcon
            sx={{
              fontSize: "18px",
            }}
          />
          {getFixedNumber(view)}
        </SizeSpan>

        <SizeSpan
          title='弹幕数'
          sx={{
            display: {
              xs: "none",
              sm: "flex",
            },
          }}
        >
          <SubjectSharpIcon
            sx={{
              fontSize: "18px",
            }}
          />
          {getFixedNumber(danmaku)}
        </SizeSpan>
      </div>
      <span title='视频时长'>{getVideoTime(duration)}</span>
    </div>
  );
};

const SizeSpan = styled("span")(({ theme }) => ({
  fontSize: "13px",
  alignItems: "center",
  display: "flex",
  [theme.breakpoints.down("sm")]: {
    fontSize: "11px",
  },
}));

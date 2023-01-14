import { useScreenSize } from "@components/proview/screenSize";
import SlideshowIcon from "@mui/icons-material/Slideshow";
import SubjectSharpIcon from "@mui/icons-material/SubjectSharp";
import { styled } from "@mui/material";
import getFixedNumber from "@utils/number";
import { getVideoTime } from "@utils/time";
import { FC } from "react";
import { VideoRouterImageCardType } from "../videotype";
import { PlayIcon } from "./icon";
import styles from "./item.module.less";
export const VideoData: FC<
  Pick<VideoRouterImageCardType, "view" | "danmaku" | "duration">
> = (props) => {
  const { view, danmaku, duration } = props;
  return (
    <BorderDiv className={styles["video-data"]}>
      <div className={styles["video-data-left"]}>
        <SizeSpan title='播放量'>
          <PlayIcon height='1em' />
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
          <SubjectSharpIcon fontSize='inherit' />
          {getFixedNumber(danmaku)}
        </SizeSpan>
      </div>
      <SizeSpan title='视频时长'>{getVideoTime(duration)}</SizeSpan>
    </BorderDiv>
  );
};
const BorderDiv = styled("div")(({ theme }) => ({
  padding: "16px 8px 6px",
  borderBottomLeftRadius: "8px",
  borderBottomRightRadius: "8px",
  [theme.breakpoints.down("sm")]: {
    padding: "8px 6px 4px",
  },
}));
const SizeSpan = styled("span")(({ theme }) => ({
  fontSize: "13px",
  display: "flex",
  lineHeight: "1",
  "&>svg": {
    marginRight: "2px",
  },
  [theme.breakpoints.down("sm")]: {
    fontSize: "12px",
  },
}));

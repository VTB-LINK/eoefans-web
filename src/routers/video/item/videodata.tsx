import { useScreenSize } from "@components/proview/screenSize";
import SlideshowIcon from "@mui/icons-material/Slideshow";
import SubjectSharpIcon from "@mui/icons-material/SubjectSharp";
import getFixedNumber from "@utils/number";
import { getVideoTime } from "@utils/time";
import { FC } from "react";
import { VideoRouterImageCardType } from "../videotype";
import styles from "./item.module.less";
export const VideoData: FC<
  Pick<VideoRouterImageCardType, "view" | "danmaku" | "duration">
> = (props) => {
  const { view, danmaku, duration } = props;
  const { sm } = useScreenSize();
  return (
    <div className={styles["video-data"]}>
      <div className={styles["video-data-left"]}>
        <span title='播放量'>
          <SlideshowIcon
            sx={{
              fontSize: "18px",
            }}
          />
          {getFixedNumber(view)}
        </span>
        {sm && (
          <span title='弹幕数'>
            <SubjectSharpIcon
              sx={{
                fontSize: "18px",
              }}
            />
            {getFixedNumber(danmaku)}
          </span>
        )}
      </div>
      <span title='视频时长'>{getVideoTime(duration)}</span>
    </div>
  );
};

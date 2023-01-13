import { Avatar, Link, styled } from "@mui/material";
import ThumbUpSharpIcon from "@mui/icons-material/ThumbUpSharp";
import FavoriteSharpIcon from "@mui/icons-material/FavoriteSharp";
import { useScreenMatchSize } from "@utils/hooks/match";
import getFixedNumber from "@utils/number";
import getrealtiveTime from "@utils/time";
import { FC } from "react";
import { VideoRouterImageCardType } from "../videotype";
import { BiliIcon, CoinIcon } from "./icon";
import styles from "./item.module.less";
export const VideoInfo: FC<
  Pick<VideoRouterImageCardType, "title" | "name" | "pubdate" | "bvid" | "face">
> = (props) => {
  const { title, name, bvid, pubdate, face } = props;
  const matchsmSize = useScreenMatchSize("sm");
  return (
    <div className={styles["video-info"]}>
      <Link
        target='_blank'
        href={`https://www.bilibili.com/video/${bvid}`}
        underline='none'
        color='inherit'
      >
        <DataP title={title}>{title}</DataP>
      </Link>
      <div className={styles["video-up"]}>
        {matchsmSize ? (
          <Avatar alt={name} src={`${face}@96w_96h_1s.webp`} />
        ) : (
          <BiliIcon height={18} color='grey' />
        )}
        <div className={styles["video-up-desc"]}>
          <Link underline='none' color='inherit'>
            <span title={name}>{name}</span>
            {matchsmSize && <span>{getrealtiveTime(pubdate * 1000)}</span>}
          </Link>
          {/* {matchsmSize && (
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
          )} */}
        </div>
      </div>
    </div>
  );
};

const DataP = styled("p")(({ theme }) => ({
  fontSize: "15px",
  height: "40px",
  lineHeight: "20px",
  [theme.breakpoints.down("sm")]: {
    fontSize: "13px",
    height: "30px",
    lineHeight: "15px",
  },
}));

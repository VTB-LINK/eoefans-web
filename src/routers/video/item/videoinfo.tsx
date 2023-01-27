import { Link, styled } from "@mui/material";
import getrealtiveTime from "@utils/time";
import { FC } from "react";
import { VideoRouterImageCardType } from "../videotype";
import { UPIcon } from "./icon";
import styles from "./item.module.less";
import { useScreenSize } from "@components/proview/screenSize";
export const VideoInfo: FC<
  Pick<VideoRouterImageCardType, "title" | "name" | "pubdate" | "bvid">
> = (props) => {
  const { title, name, bvid, pubdate } = props;
  const { sm } = useScreenSize();
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
        <UPIcon height={16} width={32} title={`芝士${name.slice(0, 2)}`} />
        <div className={styles["video-up-desc"]}>
          <Link underline='none' color='inherit'>
            <span title={name}>{name}</span>
            {!sm && <span>{getrealtiveTime(pubdate * 1000)}</span>}
          </Link>
        </div>
      </div>
    </div>
  );
};

const DataP = styled("p")(({ theme }) => ({
  fontSize: "15px",
  margin: "5px 0",
  [theme.breakpoints.down("sm")]: {
    fontSize: "13px",
  },
}));

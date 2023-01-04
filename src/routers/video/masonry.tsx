import Image from "@components/image";
import { fetchVideos } from "@utils/fetch";
import { concurrencyRequest } from "@utils/index";
import { FC, useState, useEffect } from "react";
import SlowMotionVideoSharpIcon from "@mui/icons-material/SlowMotionVideoSharp";
import SubjectSharpIcon from "@mui/icons-material/SubjectSharp";
import Link from "@mui/material/Link";
import { VideoRouterImageCardType, VideoRouterMasonryType } from "./videotype";
import { getImageSize, getResizeHeight } from "@components/image/tool";
import { Masonry as Masonic_masonry } from "masonic";
import ImageShouldResizeProview from "@components/proview/imageSize";
import getrealtiveTime, { getVideoTime } from "@utils/time";
import styles from "./video.module.less";
/**
 * @description 该组件负责渲染视频图片的瀑布流
 */
export default function VideoMasonry(props: any) {
  const [lists, setLists] = useState<VideoRouterImageCardType[]>([]);
  const order_width = 180;
  useEffect(() => {
    // 在内部定义fetchHandler，保证拿到的是同步的
    const fetchHandler = async () => {
      const res = await fetchVideos({
          order: "view",
          page: 1,
        }),
        data = res.data.result,
        urls = data.map((item) => item.pic);
      const imageSizelists = await concurrencyRequest(urls, getImageSize, 6);
      setLists((lists) => [
        ...lists,
        ...data.map((item, index) => {
          const imageSize = imageSizelists[index],
            itemRes: VideoRouterImageCardType = {
              title: item.title,
              bvid: item.bvid,
              name: item.name,
              tname: item.tname,
              copyright: item.copyright,
              pic: item.pic,
              tag: item.tag,
              view: item.view,
              coin: item.coin,
              share: item.share,
              like: item.like,
              updated_at: item.updated_at,
              danmaku: item.danmaku,
              duration: item.duration,
            };
          if (imageSize.success === true) {
            return {
              ...itemRes,
              width: order_width,
              height: getResizeHeight(imageSize, order_width),
            };
          }
          return itemRes;
        }),
      ]);
    };
    fetchHandler();
  }, [props]);
  return (
    <div className='feedContainer'>
      <ImageShouldResizeProview>
        <Masonic_masonry
          items={lists}
          columnWidth={order_width}
          rowGutter={10}
          columnGutter={10}
          maxColumnCount={5}
          render={VideoRouterImageCard}
          overscanBy={Infinity}
        />
      </ImageShouldResizeProview>
    </div>
  );
}

const VideoRouterImageCard: FC<{ data: VideoRouterImageCardType }> = ({
  data: {
    pic,
    bvid,
    name,
    tname,
    title,
    tag,
    view,
    coin,
    share,
    like,
    updated_at,
    danmaku,
    duration,
    ...res
  },
}) => {
  return (
    <section className='element-item'>
      <Image url={pic} {...res}>
        <div className={styles["video-data"]}>
          <div className={styles["video-data-left"]}>
            <span>
              <SlowMotionVideoSharpIcon fontSize='small' />
              {view}
            </span>
            <span>
              <SubjectSharpIcon fontSize='small' />
              {danmaku}
            </span>
          </div>
          <span>{getVideoTime(duration)}</span>
        </div>
      </Image>
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
    </section>
  );
};

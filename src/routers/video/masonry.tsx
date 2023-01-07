import { fetchVideos } from "@utils/fetch";
import { concurrencyRequest, Pick } from "@utils/index";
import { useState, useEffect } from "react";
import { VideoRouterImageCardType, VideoRouterMasonryType } from "./videotype";
import {
  getImageSize,
  getResizeHeight,
  ImageSize,
} from "@components/image/tool";
import { Masonry as Masonic_masonry } from "masonic";
import Grid from "@mui/material/Unstable_Grid2";
import ImageShouldResizeProview from "@components/proview/imageSize";
import { VideoRouterImageCard } from "./masonryItem";
/**
 * @description 该组件负责渲染视频图片的瀑布流
 */
export default function VideoMasonry(props: any) {
  const [lists, setLists] = useState<VideoRouterImageCardType[]>([]);
  const order_width = 200;
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
          const imageSize: ImageSize = imageSizelists[index],
            itemRes: VideoRouterImageCardType = Pick(
              item,
              "title",
              "bvid",
              "name",
              "tname",
              "copyright",
              "pic",
              "tag",
              "view",
              "coin",
              "share",
              "like",
              "updated_at",
              "danmaku",
              "duration",
              "favorite",
              "face"
            );

          // if (imageSize.success === true) {
          //   return {
          //     ...itemRes,
          //     width: order_width,
          //     height: Math.floor((order_width * 3) / 4),
          //   };
          // }
          return itemRes;
        }),
      ]);
    };
    fetchHandler();
  }, [props]);
  return (
    <div className='feedContainer'>
      <ImageShouldResizeProview>
        <Grid
          container
          spacing={2}
          columns={{
            lg: 10,
            md: 8,
            sm: 6,
            xs: 4,
          }}
        >
          {lists.map((item, index) => (
            <Grid key={index} xs={2}>
              <VideoRouterImageCard data={item} />
            </Grid>
          ))}
        </Grid>
      </ImageShouldResizeProview>
    </div>
  );
}

//todo：改成feed流

import { fetchVideos } from "@utils/fetch";
import { concurrencyRequest, Pick } from "@utils/index";
import { useState, useEffect, FC } from "react";
import { VideoRouterImageCardType, VideoRouterMasonryType } from "./videotype";
import { getImageSize } from "@components/image/tool";
import Grid from "@mui/material/Unstable_Grid2";
import ImageShouldResizeProview from "@components/proview/imageSize";
import { VideoRouterImageCard } from "./masonryItem";
import { Skeleton } from "@mui/material";
/**
 * @description 该组件负责渲染视频图片的瀑布流
 */
export default function VideoMasonry(props: any) {
  const [lists, setLists] = useState<VideoRouterImageCardType[]>([]);
  const [isLoading, setLoading] = useState<boolean>(true);
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
          const itemRes: VideoRouterImageCardType = Pick(
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
          return itemRes;
        }),
      ]);
    };
    fetchHandler().then(() => setLoading(false));
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
          {isLoading && <LoadingSkeleton num={20} />}
        </Grid>
      </ImageShouldResizeProview>
    </div>
  );
}

const LoadingSkeleton: FC<{ num: number }> = ({ num = 0 }) => {
  return (
    <>
      {...Array.from({ length: num }, (v, key) => (
        <Grid xs={2} key={key}>
          <Skeleton
            variant='rounded'
            animation='wave'
            width={"100%"}
            height={180}
          />
          <Skeleton animation='wave' height={20} />
          <Skeleton animation='wave' width={"50%"} height={20} />
          <div
            style={{
              display: "flex",
            }}
          >
            <Skeleton
              variant='circular'
              animation='wave'
              width={40}
              height={40}
            />
            <div
              style={{
                flex: "1",
              }}
            >
              <Skeleton animation='wave' width={"80%"} height={20} />
              <Skeleton animation='wave' width={"80%"} height={20} />
            </div>
          </div>
        </Grid>
      ))}
    </>
  );
};

//todo：改成feed流

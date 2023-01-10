import { fetchVideos } from "@utils/fetch";
import { concurrencyRequest, Pick } from "@utils/index";
import { useState, useEffect, FC, memo } from "react";
import { VideoRouterImageCardType, VideoRouterMasonryType } from "./videotype";
import { Unstable_Grid2 as Grid } from "@mui/material";
import ImageShouldResizeProview from "@components/proview/imageSize";
import { VideoRouterImageCard } from "./item";
import { Skeleton } from "@mui/material";
import { nanoid } from "nanoid";
import styles from "./video.module.less";
/**
 * @description 该组件负责渲染视频图片的瀑布流
 */
export default function VideoMasonry(props: any) {
  const [lists, setLists] = useState<
    (VideoRouterImageCardType & { id: string })[]
  >([]);
  const [isLoading, setLoading] = useState<boolean>(true);
  useEffect(() => {
    // 在内部定义fetchHandler，保证拿到的是同步的
    const fetchHandler = async (page: number = 1, ...resProps: any[]) => {
      const res = await fetchVideos({
          order: "view",
          page,
          ...resProps,
        }),
        data = res.data.result;
      // ,
      // url_pic = data.map(
      //   (item) => `${item.pic}@672w_378h_1c_!web-search-common-cover`
      // ),
      // url_face = data.map((item) => item.face);
      // const imageSizelists = await concurrencyRequest(
      //   [...url_pic, ...url_face],
      //   getImageSize,
      //   10
      // );
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
          if (index === data.length - 3) {
            return {
              ...itemRes,
              id: nanoid(4),
              observer: true,
              callback: (inView: boolean) => {
                // fetchHandler(page + 1, ...resProps);
              },
            };
          }
          return { ...itemRes, id: nanoid(4) };
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
          spacing={{
            lg: 2,
            md: 1,
            sm: 1,
            xs: 1,
          }}
          columns={{
            lg: 10,
            md: 8,
            sm: 6,
            xs: 4,
          }}
        >
          {lists.map((item) => (
            <MemoItems key={item.id} {...item} />
          ))}
          {isLoading && <LoadingSkeleton num={20} />}
        </Grid>
      </ImageShouldResizeProview>
    </div>
  );
}
const MemoItems: FC<VideoRouterImageCardType> = memo((props) => {
  return (
    <Grid xs={2}>
      <VideoRouterImageCard data={props} />
    </Grid>
  );
});

const LoadingSkeleton: FC<{ num: number }> = ({ num = 0 }) => {
  return (
    <>
      {...Array.from({ length: num }, (v, key) => (
        <Grid xs={2} key={key}>
          <Skeleton
            variant='rounded'
            animation='wave'
            className={styles["skeleton-img"]}
          />
          <Skeleton animation='wave' height={20} />
          <Skeleton animation='wave' width={"50%"} height={20} />
          <div className={styles["skeleton-content"]}>
            <Skeleton
              variant='circular'
              animation='wave'
              width={40}
              height={40}
            />
            <div className={styles["skeleton-info"]}>
              <Skeleton animation='wave' width={"80%"} height={20} />
              <Skeleton animation='wave' width={"80%"} height={20} />
            </div>
          </div>
        </Grid>
      ))}
    </>
  );
};

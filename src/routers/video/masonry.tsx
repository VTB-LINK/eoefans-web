import { useState, useEffect, FC, memo } from "react";
import { VideoRouterImageCardType, VideoRouterMasonryType } from "./videotype";
import { Unstable_Grid2 as Grid } from "@mui/material";
import { VideoRouterImageCard } from "./item";
import { Skeleton } from "@mui/material";
import { nanoid } from "nanoid";
import styles from "./video.module.less";
import { fetchVideohandler, PickVideoRouterImageCardType } from "./tools";
import { useAppSelector, useAppDispatch } from "@store/hooks";
import { changeLoading, selectVideoLoadingState } from "@store/loading/index";
/**
 * @description 该组件负责渲染视频图片的瀑布流
 */
export default function VideoMasonry(props: VideoRouterMasonryType) {
  const [lists, setLists] = useState<
    (VideoRouterImageCardType & { id: string })[]
  >([]);
  const isLoading = useAppSelector(selectVideoLoadingState),
    dispatch = useAppDispatch(),
    handerChangeLoading = (state: boolean) =>
      dispatch(changeLoading({ stateName: "videoIsLoading", Tostate: state }));
  useEffect(() => {
    // 在内部定义fetchHandler，保证拿到的是同步的
    const fetchHandler = async (page: number = 1) => {
      const data = await fetchVideohandler(page, props);
      setLists((lists) => [
        ...lists,
        ...data.map((item, index) => {
          const itemRes = PickVideoRouterImageCardType(item);
          if (index === data.length - 3) {
            return {
              ...itemRes,
              id: nanoid(4),
              observer: true,
              callback: (inView: boolean) => {
                fetchHandler(page + 1);
              },
            };
          }
          return { ...itemRes, id: nanoid(4) };
        }),
      ]);
    };
    setLists([]);
    handerChangeLoading(true);
    fetchHandler(1).then(() => handerChangeLoading(false));
  }, [props]);
  return (
    <div className='feedContainer'>
      <Grid
        container
        spacing={{
          lg: 2,
          md: 1,
          sm: 1,
          xs: 1,
        }}
        rowSpacing={2}
        columns={{
          lg: 10,
          md: 8,
          sm: 6,
          xs: 4,
        }}
        className={styles["container"]}
      >
        {lists.map((item) => (
          <MemoItems key={item.id} {...item} />
        ))}
        {isLoading && <LoadingSkeleton num={20} />}
      </Grid>
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
            <Skeleton animation='wave' width={40} height={25} />
            <Skeleton animation='wave' width={"60%"} height={20} />
          </div>
        </Grid>
      ))}
    </>
  );
};

import { selectPhotoLoadingState } from "@store/loading";
import { Masonry as Masonic_masonry } from "masonic";
import { useState, useEffect } from "react";
import { useAppSelector, useAppDispatch } from "@store/hooks";

import { changeLoading } from "@store/loading/index";
import { fetchPhotoHandler } from "./tools";
import { PhotoRouterImageCardType, PhotoRouterMasonryType } from "./phototype";
import PhotoCard from "./item";
import { useScreenSize } from "@components/proview/screenSize";
import message from "@components/message";
import styles from "./photo.module.less";
//todo props type change
export default function Masonry(props: PhotoRouterMasonryType) {
  const [lists, setList] = useState<PhotoRouterImageCardType[]>([]);
  const isLoading = useAppSelector(selectPhotoLoadingState),
    dispatch = useAppDispatch(),
    handerChangeLoading = (state: boolean) =>
      dispatch(
        changeLoading({
          stateName: "photoIsloading",
          Tostate: state,
        })
      );
  useEffect(() => {
    const fetchHandler = async (page: number = 0) => {
      const data = await fetchPhotoHandler({
        page,
        ...props,
      });
      setList((lists) => {
        return [
          ...lists,
          ...data.map((item, index) => {
            const itemRes = {
              dynamic_id: item.dynamic_id,
              images: item.pictures.map((img) => ({
                src: img.img_src,
                height: img.img_height,
                width: img.img_width,
              })),
            };
            if (data.length < 3) {
              message.info("没有更多图片了,尝试使用其他tag吧!");
            }
            if (index === data.length - 3) {
              return {
                ...itemRes,
                observer: true,
                callback: (inView: boolean) => {
                  fetchHandler(page + 1);
                },
              };
            }
            return itemRes;
          }),
        ];
      });
    };
    setList(() => []);
    handerChangeLoading(true);
    fetchHandler(1).then(() => handerChangeLoading(false));
  }, [props]);
  const { sm, md } = useScreenSize(),
    minCount = sm ? { columnCount: 2 } : {};
  return (
    <div className={styles["container"]}>
      {isLoading || (
        <Masonic_masonry
          items={lists}
          maxColumnCount={5}
          {...minCount}
          columnGutter={md ? 5 : 10}
          rowGutter={md ? 5 : 10}
          columnWidth={200}
          render={PhotoCard}
          overscanBy={Infinity}
          className={styles["container"]}
        />
      )}
    </div>
  );
}

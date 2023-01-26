import { selectPhotoLoadingState } from "@store/loading";
import { Masonry as Masonic_masonry } from "masonic";
import { useState, useEffect, FC } from "react";
import { useAppSelector, useAppDispatch } from "@store/hooks";

import { changeLoading } from "@store/loading/index";
import { fetchPhotoHandler } from "./tools";
import { PhotoRouterImageCardType } from "./phototype";
import PhotoCard from "./item";

//todo props type change
export default function Masonry(props: any) {
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
        topic_id: 0,
        type: "latest",
      });
      setList((lists) => {
        return [
          ...lists,
          ...data.map((item) => ({
            images: item.pictures.map((img) => ({
              src: img.img_src,
              height: img.img_height,
              width: img.img_width,
            })),
          })),
        ];
      });
    };
    fetchHandler();
  }, [props]);
  return (
    <>
      <Masonic_masonry
        items={lists}
        maxColumnCount={5}
        columnGutter={10}
        rowGutter={10}
        columnWidth={200}
        render={PhotoCard}
      />
    </>
  );
}

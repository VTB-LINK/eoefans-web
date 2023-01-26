import { FC, useState, useEffect, useCallback } from "react";
import { Masonry as Masonic_masonry } from "masonic";
import Image from "@components/image";
import { SingleRun, concurrencyRequest } from "@utils/index";
import { fetchPhotos, fetchVideos } from "@utils/fetch";
import { nanoid } from "nanoid";
import { getImageSize } from "../image/tool";
export default function Masonry() {
  const [lists, setLists] = useState<MasonryImageType[]>([]);
  const fetchMoreItems = async (
    startIndex: number,
    stopIndex: number,
    currentItems: any[]
  ) => {
    const res = await fetchPhotos({
        type: "recommend",
        page: 0,
        topic_id: 0,
      }),
      data = res.data.result;
  };
  const fetchMoreItemsHandler = useCallback(SingleRun(fetchMoreItems), [
    setLists,
  ]);
  useEffect(() => {
    fetchMoreItemsHandler(0, 20, []);
    console.log("effect");
  }, [fetchMoreItemsHandler]);
  return (
    <div
      style={{
        marginTop: "30px",
      }}
    >
      <div className='feedContainer'>
        <Masonic_masonry
          items={lists}
          columnWidth={200}
          rowGutter={10}
          columnGutter={10}
          maxColumnCount={5}
          render={FakerCard}
          overscanBy={Infinity}
        />
      </div>
    </div>
  );
}

type MasonryImageType = {
  id: string;
  image: string;
  name: string;
  observer?: boolean;
  callback?: (inView: boolean) => void;
};

type CardType = {
  data: MasonryImageType;
};

const FakerCard: FC<CardType> = ({ data: { id, image, name, ...res } }) => {
  return (
    <section key={id} className='element-item'>
      <Image url={image} {...res} />
      <div className='footer'>
        <p>
          <span>{name}</span>
        </p>
      </div>
    </section>
  );
};

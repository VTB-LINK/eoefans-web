import { FC, useState, useEffect, useCallback } from "react";
import { Masonry as Masonic_masonry, useInfiniteLoader } from "masonic";
import Image from "@components/image";
import { FetchNewImages } from "@utils/faker/index";
import { SingleRun } from "@utils/index";
import { fetchVideos } from "@utils/fetch";
import { nanoid } from "nanoid";
export default function Masonry() {
  const [lists, setLists] = useState<
    {
      image: string;
      name: string;
      id: string;
    }[]
  >([]);
  const fetchMoreItems = async (
    startIndex: number,
    stopIndex: number,
    currentItems: any[]
  ) => {
    // const res = await FetchNewImages(stopIndex - startIndex);
    const res = await fetchVideos({
        order: "view",
        page: 1,
      }),
      data = res.data.result;

    setLists((lists) => {
      // console.log({
      //   startIndex,
      //   stopIndex,
      //   currentNum: lists.length + res.length,
      // });
      return [
        ...lists,
        ...data.map((item) => ({
          image: item.face,
          name: item.name,
          id: nanoid(10),
        })),
      ];
    });
  };
  const fetchMoreItemsHandler = useCallback(SingleRun(fetchMoreItems), [
    setLists,
  ]);
  useEffect(() => {
    fetchMoreItemsHandler(0, 20, []);
    console.log("effect");
  }, [fetchMoreItemsHandler]);
  const maybeLoaadMore = useInfiniteLoader(fetchMoreItemsHandler, {
    threshold: 10,
    isItemLoaded: (index, items) => {
      return !!items[index];
    },
    minimumBatchSize: 20,
  });
  return (
    <div
      style={{
        marginTop: "30px",
      }}
    >
      <div className='feedContainer'>
        <Masonic_masonry
          items={lists}
          columnWidth={180}
          rowGutter={10}
          columnGutter={10}
          maxColumnCount={5}
          render={FakerCard}
          // overscanBy={Infinity}
          overscanBy={3}
          onRender={maybeLoaadMore}
        />
      </div>
    </div>
  );
}
type CardType = {
  data: {
    id: string;
    image: string;
    name: string;
  };
};

const FakerCard: FC<CardType> = ({ data: { id, image, name } }) => {
  return (
    <section key={id} className='element-item'>
      <Image url={image} />
      <div className='footer'>
        <p>
          <span>{name}</span>
        </p>
      </div>
    </section>
  );
};

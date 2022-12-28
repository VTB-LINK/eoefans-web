import { FC, useState, useEffect } from "react";
import { Masonry, useInfiniteLoader } from "masonic";
import Image from "@components/image";
import { FetchNewImages, createRandomBlob } from "@utils/faker/index";
export default function App() {
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
    const res = await FetchNewImages(stopIndex - startIndex);
    // console.log({ startIndex, stopIndex });
    setLists((lists) => [...lists, ...res]);
  };
  useEffect(() => {
    fetchMoreItems(0, 10, []);
  }, []);
  const maybeLoaadMore = useInfiniteLoader(fetchMoreItems, {
    threshold: 6,
    isItemLoaded: (index, items) => {
      return !!items[index];
    },
    minimumBatchSize: 12,
    // totalItems: 30,
  });
  return (
    <div
      style={{
        marginTop: "30px",
      }}
    >
      <div className='feedContainer'>
        <Masonry
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

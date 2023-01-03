import { useState, useCallback, useEffect, FC } from "react";
//@ts-ignore
import Masonry from "@mui/lab/Masonry";
import { SingleRun, concurrencyRequest } from "@utils/index";
import { fetchVideos } from "@utils/fetch";
import { nanoid } from "nanoid";
import Image from "@components/image";
export default function ImageMasonry() {
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
    const res = await fetchVideos({
        order: "view",
        page: 1,
      }),
      data = res.data.result,
      urls = data.map((item) => item.face);
    await concurrencyRequest(urls, 6, "success", "error");
    setLists((lists) => {
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
  return (
    <>
      <div className='feedContainer'>
        <Masonry columns={5} spacing={2}>
          {lists.map((item) => (
            <FakerCard data={item} />
          ))}
        </Masonry>
      </div>
    </>
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

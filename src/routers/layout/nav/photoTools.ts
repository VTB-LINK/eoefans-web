import { nanoid } from "nanoid";
import { useMemo, useState } from "react";
import { Storage } from "../tools";
import { getVersion } from "@utils/index";
import { IFetchPhotoParams } from "@utils/fetch/fetchtype";

export interface PhotoNavStorage {
  version: string;
  res: PhotoNavQueryItemType[];
}
export const PhotoNavStorage = new Storage<PhotoNavStorage>("photonavTagLists");

export function usePhotoNavList(): [
  PhotoNavQueryItemType[],
  React.Dispatch<React.SetStateAction<PhotoNavQueryItemType[]>>
] {
  const nav_ok_lists = useMemo(() => {
    const local_lists = PhotoNavStorage.getLocalStorage({
      version: getVersion(),
      res: [],
    } as PhotoNavStorage);
    if (!local_lists.version || local_lists.res.length < 2) {
      return photo_query_nav_list;
    }
    //todo change logi
    if (parseFloat(local_lists.version) < parseFloat(getVersion())) {
      return photo_query_nav_list;
    }
    return local_lists.res;
  }, []);
  const [navLists, setLists] = useState<PhotoNavQueryItemType[]>(nav_ok_lists);
  return [navLists, setLists];
}

export type PhotoTopicType = {
  id: String;
  type: "photo-selected";
  query: string;
  queryType: "topic_id";
  queryString: IFetchPhotoParams["topic_id"];
};
export type PhotoSearchType = {
  id: String;
  type: "photo-selected";
  query: string;
  queryType: "type";
  queryString: IFetchPhotoParams["type"];
};

export type PhotoNavQueryItemType = PhotoTopicType | PhotoSearchType;

const nav_tag_list_no_id: Pick<
    PhotoNavQueryItemType,
    "query" | "queryString" | "queryType"
  >[] = [
    {
      query: "最新图片",
      queryType: "type",
      queryString: "latest",
    },
    {
      query: "推荐图片",
      queryType: "type",
      queryString: "recommend",
    },
    {
      query: "全部",
      queryType: "topic_id",
      queryString: 0,
    },
    {
      query: "露早",
      queryType: "topic_id",
      queryString: 29067608,
    },
    {
      query: "柚恩",
      queryType: "topic_id",
      queryString: 28950030,
    },
    {
      query: "莞儿",
      queryType: "topic_id",
      queryString: 28953983,
    },
    {
      query: "米诺",
      queryType: "topic_id",
      queryString: 29069147,
    },
    {
      query: "虞莫",
      queryType: "topic_id",
      queryString: 28948378,
    },
    {
      query: "EOE组合",
      queryType: "topic_id",
      queryString: 29156150,
    },
  ],
  photo_query_nav_list = nav_tag_list_no_id.map((item) => ({
    ...item,
    id: nanoid(3),
    type: "photo-selected",
  })) as PhotoNavQueryItemType[];

export const PhotoQueryNavList = photo_query_nav_list;

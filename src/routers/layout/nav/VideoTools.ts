import { nanoid } from "nanoid";
import { useMemo, useState } from "react";
import { Storage } from "../tools";
import { getVersion } from "@utils/index";

export interface VideoNavStorage {
  version: string;
  res: VideoNavQueryItemType[];
}

export const VideoNavStorage = new Storage<VideoNavStorage>("navTagLists");

export function useVideoNavList(): [
  VideoNavQueryItemType[],
  React.Dispatch<React.SetStateAction<VideoNavQueryItemType[]>>
] {
  const nav_ok_lists = useMemo(() => {
    const local_lists = VideoNavStorage.getLocalStorage({
      version: getVersion(),
      res: [],
    } as VideoNavStorage);
    if (!local_lists.version) {
      return video_query_nav_list;
    }
    //todo 修改逻辑
    if (parseFloat(local_lists.version) < parseFloat(getVersion())) {
      return video_query_nav_list;
    }
    if (PassNavList(local_lists.res)) {
      return local_lists.res;
    }
    return video_query_nav_list;
  }, []);
  const [navLists, setLists] = useState<VideoNavQueryItemType[]>(nav_ok_lists);
  return [navLists, setLists];
}
// 判断类型
const isNavRouterItemType = (
  input: NavListItemType
): input is NavRouterItemType => {
  return input.type === "router";
};
//检查对象是否有相应属性且类型相同
function checkPropertyType<T extends { [k: string]: any }>(
  input: T,
  property: string,
  type: string
) {
  return input.hasOwnProperty(property) && typeof input[property] === type;
}
//检测从localstorage提取的querylist是否满足条件
function PassNavList(lists: VideoNavQueryItemType[]) {
  if (
    lists.length > 0 &&
    lists.every((item) => {
      if (
        !allHasTypes.every(({ name, type }) =>
          checkPropertyType(item, name, type)
        )
      ) {
        return false;
      }
      if (isNavRouterItemType(item)) {
        return routerHasTypes.every(({ name, type }) =>
          checkPropertyType(item, name, type)
        );
      } else {
        return queryHasTypes.every(({ name, type }) =>
          checkPropertyType(item, name, type)
        );
      }
    })
  ) {
    return true;
  }
  return false;
}
//构造器
const createHasType = (...rest: string[]) => {
  return { name: rest[0], type: rest[1] || "string" };
};
//构造器
const createHasTypeList = (inputList: string[][]) =>
  inputList.map((items) => createHasType(...items));

const allHasTypes = createHasTypeList([
    ["id"],
    ["type"],
    ["cancelable", "boolean"],
  ]),
  routerHasTypes = createHasTypeList([["pathname"], ["name"]]),
  queryHasTypes = createHasTypeList([
    ["query"],
    ["queryType"],
    ["queryString"],
  ]);

export type NavRouterItemType = {
  id: string;
  type: "router";
  pathname: string;
  name: string;
  cancelable: boolean;
};
export type VideoNavQueryItemType = {
  id: string;
  type: "query";
  query: string;
  queryType: "q" | "tname" | "copyright" | "order";
  queryString: string;
  cancelable: boolean;
};
export type NavListItemType = VideoNavQueryItemType | NavRouterItemType;
const nav_tag_list_no_id: Omit<VideoNavQueryItemType, "id" | "cancelable">[] = [
    {
      type: "query",
      query: "露早",
      queryType: "q",
      queryString: "露早+露早GOGO",
    },
    {
      type: "query",
      query: "柚恩",
      queryType: "q",
      queryString: "柚恩+柚恩不加糖",
    },
    {
      type: "query",
      query: "莞儿",
      queryType: "q",
      queryString: "莞儿+莞儿睡不醒",
    },
    {
      type: "query",
      query: "米诺",
      queryType: "q",
      queryString: "米诺+米诺高分少女",
    },
    {
      type: "query",
      query: "虞莫",
      queryType: "q",
      queryString: "虞莫+虞莫MOMO",
    },
    {
      type: "query",
      query: "动画分区",
      queryType: "tname",
      queryString: "animation",
    },
    {
      type: "query",
      query: "音乐分区",
      queryType: "tname",
      queryString: "music",
    },
    {
      type: "query",
      query: "舞蹈分区",
      queryType: "tname",
      queryString: "dance",
    },
    {
      type: "query",
      query: "游戏分区",
      queryType: "tname",
      queryString: "delicacy",
    },
    {
      type: "query",
      query: "鬼畜分区",
      queryType: "tname",
      queryString: "guichu",
    },
    {
      type: "query",
      query: "原创",
      queryType: "copyright",
      queryString: "1",
    },
    {
      type: "query",
      query: "转载",
      queryType: "copyright",
      queryString: "2",
    },
    {
      type: "query",
      query: "最新发布",
      queryType: "order",
      queryString: "pubdate",
    },
    {
      type: "query",
      query: "最多播放",
      queryType: "order",
      queryString: "view",
    },
  ],
  video_query_nav_list = nav_tag_list_no_id.map((item) => ({
    ...item,
    id: nanoid(3),
    cancelable: false,
  })) as VideoNavQueryItemType[];

export const VideoQueryNavList = video_query_nav_list;

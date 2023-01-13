import { nanoid } from "nanoid";
import { useMemo, useState } from "react";
import { getLocalStorage } from "../tools";
export function useNavList(): [
  NavQueryItemType[],
  React.Dispatch<React.SetStateAction<NavQueryItemType[]>>
] {
  const nav_ok_lists = useMemo(() => {
    const local_lists = getLocalStorage(
      "navTagLists",
      [] as NavQueryItemType[]
    );
    if (PassNavList(local_lists)) {
      return local_lists;
    }
    return query_nav_list;
  }, []);
  const [navLists, setLists] = useState<NavQueryItemType[]>(nav_ok_lists);
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
function PassNavList(lists: NavQueryItemType[]) {
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
export type NavQueryItemType = {
  id: string;
  type: "query";
  query: string;
  queryType: "q" | "tname" | "copyright";
  queryString: string;
  cancelable: boolean;
};
export type NavListItemType = NavQueryItemType | NavRouterItemType;
const nav_tag_list = [
    {
      type: "router",
      pathname: "photo",
      name: "图片",
    },
    {
      type: "router",
      pathname: "video",
      name: "视频",
    },
    {
      type: "query",
      query: "所有二创",
      queryType: "q",
      queryString: "",
    },
    {
      type: "query",
      query: "露早",
      queryType: "q",
      queryString: "露早",
    },
    {
      type: "query",
      query: "柚恩",
      queryType: "q",
      queryString: "柚恩",
    },
    {
      type: "query",
      query: "莞儿",
      queryType: "q",
      queryString: "莞儿",
    },
    {
      type: "query",
      query: "米诺",
      queryType: "q",
      queryString: "米诺",
    },
    {
      type: "query",
      query: "虞莫",
      queryType: "q",
      queryString: "虞莫",
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
      query: "其他分区",
      queryType: "tname",
      queryString: "other",
    },
  ].map((item) => ({
    ...item,
    id: nanoid(3),
    cancelable: false,
  })) as NavListItemType[],
  query_nav_list = nav_tag_list.filter(
    (item) => item.type === "query"
  ) as NavQueryItemType[];

export const router_nav_list = nav_tag_list.filter(
  (item) => item.type === "router"
) as NavRouterItemType[];

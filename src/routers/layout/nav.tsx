import { Chip, Stack } from "@mui/material";
import {
  Outlet,
  NavLink,
  useLoaderData,
  Form,
  redirect,
  useLocation,
  useSubmit,
} from "react-router-dom";
import { nanoid } from "nanoid";
import styles from "./layout.module.less";
import { FC, useState } from "react";

const router_lists = [
  {
    id: nanoid(2),
    type: "router",
    pathname: "photo",
    name: "图片",
  },
  {
    id: nanoid(2),
    type: "router",
    pathname: "video",
    name: "视频",
  },
];

const nav_lists = [
  {
    type: "query",
    query: "所有二创",
  },
  {
    type: "query",
    query: "露早",
  },
  {
    type: "query",
    query: "柚恩",
  },
  {
    type: "query",
    query: "莞儿",
  },
  {
    type: "query",
    query: "米诺",
  },
  {
    type: "query",
    query: "虞莫",
  },
  {
    type: "query",
    query: "动画分区",
  },
  {
    type: "query",
    query: "音乐分区",
  },
  {
    type: "query",
    query: "舞蹈分区",
  },
  {
    type: "query",
    query: "游戏分区",
  },
  {
    type: "query",
    query: "鬼畜分区",
  },
  {
    type: "query",
    query: "其他分区",
  },
].map((item) => ({ ...item, id: nanoid(3) }));

export default function Header_Nav() {
  //todo 这里存放到context中间去
  return (
    <>
      <Stack direction='row' spacing={2} className={styles["navstack"]}>
        {router_lists.map((router) => (
          <NavLink
            key={router.id}
            to={router.pathname}
            className={({ isActive, isPending }) =>
              `${styles["navlink"]} ${isActive ? styles["navlink-active"] : ""}`
            }
          >
            <Chip label={router.name} clickable />
          </NavLink>
        ))}
        {nav_lists.map((nav) => (
          <ClickChip key={nav.id} label={nav.query} />
        ))}
      </Stack>
    </>
  );
}

const ClickChip: FC<{ label: string }> = (props) => {
  const [clicked, setClick] = useState<boolean>(false);
  return (
    <Chip
      {...props}
      color={clicked ? "info" : "default"}
      onClick={() => setClick((clicked) => !clicked)}
    />
  );
};

import { Chip, Stack } from "@mui/material";
import { useInView } from "react-intersection-observer";
import SegmentIcon from "@mui/icons-material/Segment";
import CloseFullscreenIcon from "@mui/icons-material/CloseFullscreen";
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
import { FC, forwardRef, useState, useEffect, useMemo } from "react";

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
  const { ref, inView } = useInView({ initialInView: true });
  const [showed, setShow] = useState(false);
  console.log({ inView });
  const ComRes = useMemo(
    () => (
      <>
        {router_lists.map((router) => (
          <NavLink
            key={router.id}
            to={router.pathname}
            className={({ isActive, isPending }) =>
              `${styles["navlink"]} ${isActive ? styles["navlink-active"] : ""}`
            }
          >
            <Chip
              className={styles["navstack-filter-tag"]}
              label={router.name}
              clickable
            />
          </NavLink>
        ))}
        {nav_lists.map((nav) => (
          <ClickChip key={nav.id} label={nav.query} />
        ))}
      </>
    ),
    []
  );
  return (
    <div className={styles["nav"]}>
      <Stack
        direction='row'
        alignItems='center'
        className={`${styles["navstack"]}`}
        style={{
          display: showed ? "grid" : "flex",
        }}
        data-showed={showed}
      >
        {ComRes}
        <span
          ref={ref}
          style={{
            margin: 0,
            width: "1px",
          }}
        ></span>
        <div
          className={styles["nav-right-show-btn"]}
          onClick={() => setShow((showed) => !showed)}
          style={{
            display: inView ? "none" : "flex",
          }}
        >
          <SegmentIcon fontSize='medium' />
        </div>
      </Stack>
    </div>
  );
}

const ClickChip: FC<{ label: string }> = (props) => {
  const [clicked, setClick] = useState<boolean>(false);
  return (
    //@ts-ignore
    <Chip
      className={styles["navstack-filter-tag"]}
      {...props}
      color={clicked ? "info" : "default"}
      onClick={() => setClick((clicked) => !clicked)}
    />
  );
};
//todo：修复展示更多栏的bug
//todo：改造nav栏，通过拖拽修改排序

import { Chip, Stack } from "@mui/material";
import { useInView } from "react-intersection-observer";
import SegmentIcon from "@mui/icons-material/Segment";
import CloseFullscreenIcon from "@mui/icons-material/CloseFullscreen";
import { NavLink } from "react-router-dom";
import {
  DndContext,
  closestCenter,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from "@dnd-kit/core";
import { arrayMove, SortableContext, useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import {
  restrictToHorizontalAxis,
  restrictToParentElement,
} from "@dnd-kit/modifiers";
import { nanoid } from "nanoid";
import styles from "./layout.module.less";
import { FC, useState, useEffect, useMemo, memo } from "react";
import { Pick } from "@utils/index";
import { Flipped, Flipper } from "react-flip-toolkit";
//todo 拆分组件
//todo 修改文件夹
export default function Header_Nav() {
  //todo 这里在loacalstorage中查找
  const [navLists, setLists] = useState<NavListItemType[]>(nav_tag_list);
  //tag区是否展开
  const [showed, setShow] = useState(false);
  //拖拽事件绑定
  const sensors = useSensors(
    // 鼠标点击
    useSensor(MouseSensor, {
      activationConstraint: {
        delay: 100,
        tolerance: 5,
      },
    }),
    // 触摸屏幕
    useSensor(TouchSensor, {
      activationConstraint: {
        delay: 100,
        tolerance: 5,
      },
    })
  );
  //拖拽事件完成事件
  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      setLists((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id);
        const newIndex = items.findIndex((item) => item.id === over.id);
        return arrayMove(items, oldIndex, newIndex);
      });
    }
  }
  const ComRes = useMemo(
    () => (
      <>
        {navLists.map((item) => (
          <NavItem key={item.id} {...item} />
        ))}
      </>
    ),
    [navLists]
  );
  return (
    <Flipper flipKey={showed} decisionData={showed} spring={"veryGentle"}>
      <Flipped flipId={"list"} spring={"veryGentle"}>
        <div className={styles["nav"]}>
          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
            modifiers={[restrictToParentElement]}
          >
            <Flipped inverseFlipId='list'>
              <Stack
                direction='row'
                alignItems='center'
                className={`${styles["navstack"]}`}
                style={{
                  display: showed ? "grid" : "flex",
                }}
                data-showed={showed}
              >
                <SortableContext items={navLists}>{ComRes}</SortableContext>
                <NavInViewItem handlerClick={() => setShow((show) => !show)} />
              </Stack>
            </Flipped>
          </DndContext>
        </div>
      </Flipped>
    </Flipper>
  );
}

const NavInViewItem: FC<{
  handlerClick: React.MouseEventHandler<HTMLDivElement>;
}> = ({ handlerClick }) => {
  //最后一个span是否可见
  const { ref, inView } = useInView({ initialInView: true });
  return (
    <>
      <span
        ref={ref}
        style={{
          margin: 0,
          width: "1px",
        }}
      ></span>
      <Flipped flipId={"nav-right"} delayUntil='list'>
        <div
          className={styles["nav-right-show-btn"]}
          onClick={handlerClick}
          style={{
            display: inView ? "none" : "flex",
          }}
        >
          <SegmentIcon fontSize='medium' />
        </div>
      </Flipped>
    </>
  );
};

const NavItem: FC<NavListItemType> = memo((props) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: props.id });
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };
  return (
    <Flipped flipId={props.id} translate spring={"veryGentle"}>
      <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
        {props.type === "router" ? (
          <NavRouterChipItem
            {...Pick(props as NavRouterItemType, "pathname", "name")}
          />
        ) : (
          <NavTagChipItem {...Pick(props as NavQueryItemType, "query")} />
        )}
      </div>
    </Flipped>
  );
});

const NavRouterChipItem: FC<Pick<NavRouterItemType, "pathname" | "name">> =
  memo((props) => (
    <NavLink
      to={props.pathname}
      className={({ isActive, isPending }) =>
        `${styles["navlink"]} ${isActive ? styles["navlink-active"] : ""}`
      }
    >
      <Chip
        className={styles["navstack-filter-tag"]}
        label={props.name}
        clickable
      />
    </NavLink>
  ));

const NavTagChipItem: FC<Pick<NavQueryItemType, "query">> = memo((props) => {
  const [clicked, setClick] = useState<boolean>(false);
  return (
    <Chip
      className={styles["navstack-filter-tag"]}
      label={props.query}
      color={clicked ? "info" : "default"}
      onClick={() => setClick((clicked) => !clicked)}
    />
  );
});
//todo：修复展示更多栏的bug

type NavRouterItemType = {
  id: string;
  type: "router";
  pathname: string;
  name: string;
  cancelable: boolean;
};
type NavQueryItemType = {
  id: string;
  type: "query";
  query: string;
  queryType: "q" | "tname" | "copyright";
  queryString: string;
  cancelable: boolean;
};
type NavListItemType = NavQueryItemType | NavRouterItemType;

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
})) as NavListItemType[];

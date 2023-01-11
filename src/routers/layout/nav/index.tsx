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
import styles from "./nav.module.less";
import { FC, useState, useEffect, useMemo, memo } from "react";
import { Pick } from "@utils/index";
import { Flipped, Flipper } from "react-flip-toolkit";
import {
  NavListItemType,
  NavRouterItemType,
  NavQueryItemType,
  useNavList,
} from "./tools";
import { setLocalstorage } from "../tools";
//todo 拆分组件
export default function Header_Nav() {
  //todo 这里在loacalstorage中查找
  const [navLists, setLists] = useNavList();
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
        const oldIndex = items.findIndex((item) => item.id === active.id),
          newIndex = items.findIndex((item) => item.id === over.id),
          newLists = arrayMove(items, oldIndex, newIndex);
        setLocalstorage("navTagLists", newLists);
        return newLists;
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
                  // display: showed ? "grid" : "flex",
                  flexWrap: showed ? "wrap" : "nowrap",
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
    transform: CSS.Translate.toString(transform),
    transition,
  };
  return (
    <Flipped flipId={props.id} spring={"veryGentle"} translate>
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

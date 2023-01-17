import { Button, Stack } from "@mui/material";
import { useInView } from "react-intersection-observer";
import SegmentIcon from "@mui/icons-material/Segment";
import CloseFullscreenIcon from "@mui/icons-material/CloseFullscreen";
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
import { restrictToParentElement } from "@dnd-kit/modifiers";
import styles from "./nav.module.less";
import { FC, useMemo, memo } from "react";
import { Flipped } from "react-flip-toolkit";
import { NavQueryItemType, useNavList } from "./tools";
import { NavStorage } from "./tools";
import { useAppSelector, useAppDispatch } from "@store/hooks";
import { changeNavMoreShowed, selectNavMoreShowed } from "@store/device/index";
import { getVersion } from "../../../utils/index";
import {
  handerAddTag,
  handerDeleteTag,
  selectActiveTags,
} from "@store/tags/index";
export default function Header_Nav() {
  const [navLists, setLists] = useNavList();
  //tag区是否展开
  const showed = useAppSelector(selectNavMoreShowed);
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
        delay: 500,
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
        NavStorage.setLocalstorage({
          version: getVersion(),
          res: newLists,
        });
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
                flexWrap: showed ? "wrap" : "nowrap",
              }}
              data-showed={showed}
            >
              <SortableContext items={navLists}>{ComRes}</SortableContext>
              <NavInViewItem />
            </Stack>
          </Flipped>
        </DndContext>
      </div>
    </Flipped>
  );
}

const NavInViewItem = () => {
  //最后一个span是否可见
  const { ref, inView } = useInView({ initialInView: true }),
    showed = useAppSelector(selectNavMoreShowed),
    dispatch = useAppDispatch();

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
          onClick={() => dispatch(changeNavMoreShowed())}
          style={{
            display: inView ? "none" : "flex",
          }}
        >
          {showed ? (
            <CloseFullscreenIcon fontSize='medium' />
          ) : (
            <SegmentIcon fontSize='medium' />
          )}
        </div>
      </Flipped>
    </>
  );
};

const NavItem: FC<NavQueryItemType> = memo((props) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: props.id });
  const style = {
    transform: CSS.Translate.toString(transform),
    transition,
  };
  return (
    <Flipped flipId={props.id} spring={"veryGentle"} translate>
      <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
        <NavTagChipItem {...props} />
      </div>
    </Flipped>
  );
});

const NavTagChipItem: FC<NavQueryItemType> = memo((props) => {
  const clicked = useAppSelector(selectActiveTags).some(
      (item) => item.id === props.id
    ),
    dispatch = useAppDispatch(),
    handerclick = () => {
      if (clicked) {
        dispatch(handerDeleteTag(props));
      } else {
        dispatch(handerAddTag(props));
      }
    },
    //@ts-ignore
    color = nameToColor[props.query] || "info";
  //todo 修改颜色,我感觉这个颜色应该会蛮难写的
  return (
    <Button
      variant={clicked ? "contained" : "outlined"}
      color={color}
      onClick={handerclick}
      sx={{
        wordBreak: "keep-all",
        fontWeight: "600",
        // padding: "1px 10px",
      }}
    >
      {props.query}
    </Button>
  );
});

const nameToColor = {
  露早: "luzaoRed",
  柚恩: "youen",
  莞儿: "waner",
  米诺: "minuo",
  虞莫: "yumo",
};

import { Chip, Stack } from "@mui/material";
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
import { FC, useState, useMemo, memo } from "react";
import { Flipped } from "react-flip-toolkit";
import { NavQueryItemType, useNavList } from "./tools";
import { setLocalstorage } from "../tools";
import { useTagsSelected } from "@components/proview/tagSelect";
import { useNavShowed } from "../../../components/proview/navShow";
export default function Header_Nav() {
  const [navLists, setLists] = useNavList();
  //tag区是否展开
  // const [showed, setShow] = useState(false);
  const { showed } = useNavShowed();
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
  const { ref, inView } = useInView({ initialInView: true });
  const { handlerChangeShow } = useNavShowed();
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
          onClick={handlerChangeShow}
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
  const [clicked, setClick] = useState<boolean>(false),
    { handerAddTag, handerDeleteTag } = useTagsSelected();
  return (
    <Chip
      className={styles["navstack-filter-tag"]}
      label={props.query}
      color={clicked ? "info" : "default"}
      onClick={() =>
        setClick((clicked) => {
          //注意这里是要改变点击状态，所以应该反着来
          //说明之前是点击状态，现在要取消点击
          if (clicked) {
            handerDeleteTag(props);
          } else {
            handerAddTag(props);
          }
          return !clicked;
        })
      }
    />
  );
});
//todo：修复展示更多栏的bug
//todo：拆分组件
//todo：点击事件后修改icon

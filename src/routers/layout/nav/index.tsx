import { Stack } from "@mui/material";
import Button from "@mui/lab/LoadingButton";
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
import {
  VideoNavQueryItemType,
  useVideoNavList,
  VideoNavStorage,
} from "./VideoTools";
import { useAppSelector, useAppDispatch } from "@store/hooks";
import { changeNavMoreShowed, selectNavMoreShowed } from "@store/device/index";
import { getVersion } from "@utils/index";
import {
  selectPhotoLoadingState,
  selectVideoLoadingState,
} from "@store/loading/index";
import { useLocation } from "react-router-dom";
import {
  PhotoNavQueryItemType,
  PhotoNavStorage,
  usePhotoNavList,
} from "./photoTools";
import {
  handerPhotoAddTag,
  handerPhotoDeleteTag,
  handerVideoAddTag,
  handerVideoDeleteTag,
  selectPhotoActiveTags,
  selectVideoActiveTags,
} from "@store/tags/index";

function useSelectList() {
  const { pathname } = useLocation(),
    flag = pathname === "/photo",
    storageSelect = flag ? PhotoNavStorage : VideoNavStorage;
  const PhotoHook = usePhotoNavList(),
    VideoHook = useVideoNavList();
  const [navLists, setLists] = flag ? PhotoHook : VideoHook;
  return { navLists, setLists, storageSelect };
}

export default function Header_Nav() {
  const { navLists, setLists, storageSelect } = useSelectList();
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
      setLists((items: any[]) => {
        const oldIndex = items.findIndex((item) => item.id === active.id),
          newIndex = items.findIndex((item) => item.id === over.id),
          newLists = arrayMove(items, oldIndex, newIndex);
        storageSelect.setLocalstorage({
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
          <NavItem key={item.id as string} {...item} />
        ))}
      </>
    ),
    [navLists]
  );
  return (
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
            <SortableContext items={navLists as any[]}>
              {ComRes}
            </SortableContext>
            <NavInViewItem />
          </Stack>
        </Flipped>
      </DndContext>
    </div>
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
      <Flipped flipId={"nav-right"} delayUntil='list' opacity translate>
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

const NavItem: FC<VideoNavQueryItemType | PhotoNavQueryItemType> = memo(
  (props) => {
    const { attributes, listeners, setNodeRef, transform, transition } =
      useSortable({ id: props.id as string });
    const style = {
      transform: CSS.Translate.toString(transform),
      transition,
    };
    return (
      <Flipped flipId={props.id as string} spring={"veryGentle"}>
        <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
          <NavTagChipItem {...props} />
        </div>
      </Flipped>
    );
  }
);

const useTagSelect = () => {
  const { pathname } = useLocation(),
    flag = pathname === "/photo",
    tag_lists = flag
      ? useAppSelector(selectPhotoActiveTags)
      : useAppSelector(selectVideoActiveTags),
    loading = flag
      ? useAppSelector(selectPhotoLoadingState)
      : useAppSelector(selectVideoLoadingState),
    dispatch = useAppDispatch(),
    addTagFunc = flag ? handerPhotoAddTag : handerVideoAddTag,
    deleteFunc = flag ? handerPhotoDeleteTag : handerVideoDeleteTag;

  return { tag_lists, loading, dispatch, addTagFunc, deleteFunc };
};

const NavTagChipItem: FC<VideoNavQueryItemType | PhotoNavQueryItemType> = memo(
  (props) => {
    const { tag_lists, loading, dispatch, addTagFunc, deleteFunc } =
      useTagSelect();
    const clicked = tag_lists.some((item) => item.query === props.query);
    const handerclick = () => {
      if (clicked) {
        //@ts-ignore
        dispatch(deleteFunc(props));
      } else {
        //@ts-ignore
        dispatch(addTagFunc(props));
      }
    };
    //@ts-ignore
    const color = nameToColor[props.query] || "info";
    return (
      <Button
        variant={clicked ? "contained" : "outlined"}
        color={color}
        onClick={handerclick}
        loading={loading}
        sx={{
          wordBreak: "keep-all",
          fontWeight: "600",
          fontSize: {
            xs: "12px",
            sm: "14px",
          },
          padding: "1px 10px",
          verticalAlign: "center",
        }}
      >
        {props.query}
      </Button>
    );
  }
);

const nameToColor = {
  露早: "luzaoRed",
  柚恩: "youen",
  莞儿: "waner",
  米诺: "minuo",
  虞莫: "yumo",
};

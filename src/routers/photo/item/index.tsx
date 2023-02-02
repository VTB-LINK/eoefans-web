import { PhotoRouterImageCardType } from "../phototype";
import { useState } from "react";
import ImgModals from "./modal";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { Link, styled } from "@mui/material";
import style from "./photo.module.less";
import { ImageBasic } from "@components/image";
import { Omit } from "@utils/index";
import CollectionsIcon from "@mui/icons-material/Collections";
type CardType = {
  data: PhotoRouterImageCardType;
};

export default function PhotoCard(props: CardType) {
  const { images, dynamic_id, ...resPorps } = props.data;
  const [open, set] = useState(false),
    handlerChangeOpen = () => set((open) => !open);
  const modalPorps = { open, images, onClose: handlerChangeOpen };
  return (
    <div className={style["card"]}>
      <ImageBasic
        url={`${images[0].src}@${250}w.webp`}
        {...Omit(images[0], "src")}
        {...resPorps}
        className={style["show-img"]}
        onClick={handlerChangeOpen}
      />
      <ImgModals {...modalPorps} />
      <DivJump>
        <Link
          href={`https://t.bilibili.com/${dynamic_id}`}
          target='_blank'
          sx={{
            color: "white",
            display: "flex",
            justifyContent: "flex-end",
            paddingBottom: "3px",
            paddingTop: "3px",
          }}
        >
          <ChevronRightIcon />
        </Link>
      </DivJump>
      {images.length > 1 && (
        <DivImgNum>
          <CollectionsIcon color='inherit' fontSize='inherit' />
          {images.length}
        </DivImgNum>
      )}
    </div>
  );
}

const DivImgNum = styled("div")(({ theme }) => ({
  position: "absolute",
  right: "0px",
  top: "0px",
  padding: "7px",
  color: "white",
  backgroundColor: "rgba(0, 0, 0, 0.4)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  columnGap: "2px",
  pointerEvents: "none",
  fontSize: "14px",
}));

const DivJump = styled("div")(({ theme }) => ({
  borderBottomLeftRadius: "8px",
  borderBottomRightRadius: "8px",
  position: "absolute",
  bottom: "0px",
  width: "100%",
  backgroundImage: `linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(90, 90,90, 0.8) 100%)`,
  "&:hover": {
    backgroundImage: `linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0,0, 0.8) 100%)`,
  },
  [theme.breakpoints.down("sm")]: {
    borderBottomLeftRadius: "4px",
    borderBottomRightRadius: "4px",
  },
}));

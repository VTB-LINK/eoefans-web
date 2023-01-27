import { PhotoRouterImageCardType } from "../phototype";
import { useState } from "react";
import ImgModals from "./modal";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { Link } from "@mui/material";
import style from "./photo.module.less";
import { ImageBasic } from "@components/image";
import { Omit } from "@utils/index";
type CardType = {
  data: PhotoRouterImageCardType;
};

export default function PhotoCard(props: CardType) {
  const { images, dynamic_id } = props.data;
  const [open, set] = useState(false),
    handlerChangeOpen = () => set((open) => !open);
  const modalPorps = { open, images, onClose: handlerChangeOpen };
  return (
    <div className={style["card"]}>
      <ImageBasic
        url={images[0].src}
        {...Omit(images[0], "src")}
        className={style["show-img"]}
        onClick={handlerChangeOpen}
      />
      <ImgModals {...modalPorps} />
      <div className={style["jump"]}>
        <Link
          href={`https://t.bilibili.com/${dynamic_id}`}
          target='_blank'
          sx={{
            color: "white",
            display: "flex",
            justifyContent: "flex-end",
            paddingBottom: "5px",
            paddingTop: "5px",
          }}
        >
          <ChevronRightIcon />
        </Link>
      </div>
    </div>
  );
}

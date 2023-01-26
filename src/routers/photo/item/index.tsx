import { PhotoRouterImageCardType } from "../phototype";
import { useState } from "react";
import ImgModals from "./modal";

type CardType = {
  data: PhotoRouterImageCardType;
};

export default function PhotoCard(props: CardType) {
  const { images } = props.data;
  const [open, set] = useState(false),
    handlerChangeOpen = () => set((open) => !open);
  const modalPorps = { open, images, onClose: handlerChangeOpen };
  return (
    <>
      <div onClick={handlerChangeOpen}>
        <img
          {...images[0]}
          style={{
            maxWidth: "100%",
            objectFit: "cover",
            height: "auto",
          }}
        />
      </div>
      <ImgModals {...modalPorps} />
    </>
  );
}

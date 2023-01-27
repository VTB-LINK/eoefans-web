import { basicImageType } from "../phototype";
import { PhotoSlider } from "react-photo-view";
import "react-photo-view/dist/react-photo-view.css";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
type ModalType = {
  images: basicImageType[];
  open: boolean;
  onClose: () => void;
};

export default function ImgModals(props: ModalType) {
  const { open, onClose, images } = props;
  const location = useLocation();
  useEffect(() => {
    let flag = false;
    const handler = () => {
      flag = true;
      onClose();
    };
    if (open) {
      history.pushState(null, "", location.pathname);
      window.addEventListener("popstate", handler, {
        once: true,
      });
      return () => {
        !flag && history.back();
        window.removeEventListener("popstate", handler);
      };
    }
  }, [open]);
  return (
    <PhotoSlider
      images={images.map((item, index) => ({ src: item.src, key: index }))}
      visible={open}
      onClose={onClose}
    />
  );
}

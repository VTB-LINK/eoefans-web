import Modal from "@components/modal";
import { basicImageType } from "../phototype";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
// import required modules
import { Pagination, Navigation } from "swiper";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import style from "./photo.module.less";
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
      console.log("push");
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
    <Modal visible={open} isNoScroll={false} closeModal={onClose}>
      <div className={style["box"]}>
        <Swiper
          pagination={{
            dynamicBullets: true,
          }}
          modules={[Pagination, Navigation]}
          loop={true}
          slidesPerView={1}
          navigation={true}
        >
          {images.map((item, index) => (
            <SwiperSlide key={index} className={style["swiper-fix"]}>
              <div className={style["imgwrapper"]}>
                <img
                  {...item}
                  style={{
                    maxWidth: "100%",
                    width: "100%",

                    height: "auto",
                    objectFit: "cover",
                  }}
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </Modal>
  );
}
//todo 修改navigation的样式
//todo 修改滚动条样式
//todo 移动到外界过于灵敏
//todo 添加关闭按钮
//todo 根据url切换tag_lists

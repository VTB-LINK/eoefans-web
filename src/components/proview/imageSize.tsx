import { useContext, useState, createContext, useEffect } from "react";
import { thorttleFn } from "@utils/index";
export const image_order_width = 180;

const ImageContext = createContext<{ isShouldchangeSize: boolean }>({
  isShouldchangeSize: false,
});

//todo
//@ts-ignore
const ImageShouldResizeProview = ({ children }) => {
  const [isShouldchangeSize, setIs] = useState<boolean>(false);
  useEffect(() => {
    const handleWindowResize = () => {
      // console.log({ width: window.innerWidth });
      setIs(() => window.innerWidth < image_order_width * 2.5);
    };
    handleWindowResize();
    const handlerThrttleResize = thorttleFn(handleWindowResize, 10);
    window.addEventListener("resize", handlerThrttleResize);
    return () => window.removeEventListener("resize", handlerThrttleResize);
  }, []);
  return (
    <ImageContext.Provider value={{ isShouldchangeSize }}>
      {children}
    </ImageContext.Provider>
  );
};

export const useImageShouldResize = () => {
  return useContext(ImageContext);
};

export default ImageShouldResizeProview;

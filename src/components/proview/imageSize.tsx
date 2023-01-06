import {
  useContext,
  useState,
  createContext,
  useEffect,
  ReactElement,
} from "react";
import { thorttleFn } from "@utils/index";
export const image_order_width = 200;

const ImageContext = createContext<{ isShouldchangeSize: boolean }>({
  isShouldchangeSize: false,
});

type ImageProviewProps = {
  children: ReactElement;
};
const ImageShouldResizeProview = ({ children }: ImageProviewProps) => {
  const [isShouldchangeSize, setIs] = useState<boolean>(false);
  useEffect(() => {
    const handleWindowResize = () => {
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

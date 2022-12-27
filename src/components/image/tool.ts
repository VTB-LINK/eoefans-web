import { Once } from "@utils/index";
import { resolve } from "path";
/**
 * image组件的工具库
 */
export function getImageSize(imageSrc: string) {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.src = imageSrc;
    if (image.complete) {
      resolve({
        width: image.width,
        height: image.height,
      });
    }
    image.onload = () =>
      resolve({
        width: image.width,
        height: image.height,
      });
  });
}

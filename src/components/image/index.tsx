import { useCallback, useMemo, useState, memo, ReactElement } from "react";
import { InView } from "react-intersection-observer";
import { useImageShouldResize } from "@components/proview/imageSize";
import { Once } from "@utils/index";
import { ImageProps } from "./imagetype";
import styles from "./image.module.less";
import { useScreenSize } from "../proview/screenSize";
import {
  getImageSize,
  getResizeHeight,
  fallbackUrl as DefaultFallbackUrl,
  ImageSize,
} from "./tool";

/**
 * @description 图片预加载hook
 */

function useLoading(url: string) {
  const [obj, setObj] = useState<ImageSize & { isLoaded: boolean }>({
    width: 0,
    height: 0,
    again: false,
    isLoaded: false,
    success: true,
  });
  useMemo(async () => {
    const res = await getImageSize(url);
    setObj(() => ({ ...res, isLoaded: true }));
  }, [url]);
  return obj;
}

/**
 *@description 图片组件库，默认支持图片加载fallback。
 */

export default memo(function Image({
  url,
  width = 200,
  height,
  fallbackUrl = DefaultFallbackUrl,
  observer,
  callback,
  children,
}: ImageProps & {
  children?: ReactElement;
}) {
  const res = useLoading(url),
    { isLoaded, success } = res,
    real_width = width,
    real_height = height || getResizeHeight(res, real_width),
    real_fallback_url = fallbackUrl || DefaultFallbackUrl;
  const once_callback = useCallback(Once(callback!!), []);
  const { isShouldchangeSize } = useImageShouldResize();
  return (
    <InView>
      {({ inView, ref, entry }) => (
        <div ref={ref} className={styles.imgWrapper}>
          <img
            width={isShouldchangeSize ? "100%" : real_width}
            height={isShouldchangeSize ? "100%" : real_height}
            src={isLoaded && success ? url : real_fallback_url}
            style={{
              opacity: isLoaded ? 1.0 : 0.09,
            }}
            alt=''
            loading='lazy'
          />
          <>{observer && inView && once_callback(inView)}</>
          {children}
        </div>
      )}
    </InView>
  );
});

export function ImageBasic({
  url,
  observer,
  callback,
  children,
}: Omit<ImageProps, "width" | "height"> & {
  children?: ReactElement;
}) {
  const once_callback = useCallback(Once(callback!!), []);
  const { md } = useScreenSize();
  return (
    <InView>
      {({ inView, ref, entry }) => (
        <div ref={ref} className={styles.imgWrapper}>
          <img
            src={`${url}${
              !md ? `@480w_270h_1c` : `@672w_378h_1c_!web-search-common-cover`
            }`}
            style={{
              opacity: 1.0,
            }}
            width='640'
            height='360'
            alt=''
            loading='lazy'
          />
          <>{observer && inView && once_callback(inView)}</>
          {children}
        </div>
      )}
    </InView>
  );
}

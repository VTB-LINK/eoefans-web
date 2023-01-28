import { useCallback, useMemo, useState, memo, ReactElement } from "react";
import { InView } from "react-intersection-observer";
import { Once } from "@utils/index";
import { ImageProps } from "./imagetype";
import styles from "./image.module.less";
import {
  getImageSize,
  getResizeHeight,
  fallbackUrl as DefaultFallbackUrl,
  ImageSize,
} from "./tool";
import { styled } from "@mui/material";

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
  return (
    <InView>
      {({ inView, ref, entry }) => (
        <BorderDiv ref={ref} className={styles.imgWrapper}>
          <img
            width={real_width}
            height={real_height}
            src={isLoaded && success ? url : real_fallback_url}
            style={{
              opacity: isLoaded ? 1.0 : 0.09,
            }}
            alt=''
            loading='lazy'
          />
          <>{observer && inView && once_callback(inView)}</>
          {children}
        </BorderDiv>
      )}
    </InView>
  );
});

export function ImageBasic({
  url,
  observer,
  callback,
  children,
  ...resProps
}: ImageProps & {
  children?: ReactElement;
  [k: string]: any;
}) {
  const once_callback = useCallback(Once(callback!!), []);
  return (
    <InView>
      {({ inView, ref, entry }) => (
        <BorderDiv ref={ref} className={styles.imgWrapper}>
          <img src={url} alt='' loading='lazy' {...resProps} />
          <>{observer && inView && once_callback(inView)}</>
          {children}
        </BorderDiv>
      )}
    </InView>
  );
}

const BorderDiv = styled("div")(({ theme }) => ({
  borderRadius: "8px",
  [theme.breakpoints.down("sm")]: {
    borderRadius: "4px",
  },
}));

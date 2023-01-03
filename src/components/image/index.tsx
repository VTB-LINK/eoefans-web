import { useCallback, useMemo, useState } from "react";
import { InView } from "react-intersection-observer";
import { Once } from "@utils/index";
import styles from "./image.module.less";
import {
  getImageSize,
  getResizeHeight,
  fallbackUrl as DefaultFallbackUrl,
  ImageSize,
} from "./tool";

/**
 * @description Image组件参数
 */
type ImageProps = {
  /**
   * @description 图片的url
   * @example "www.example.com/1.jpg"
   */
  url: string;
  /**
   * @description 图片失效的兜底图片url
   * @example "www.example.com/fallback.jpg"
   * 建议提供base64版本
   */
  fallbackUrl?: string;
  /**
   * @description 图片默认宽度，因为自适应的原因最终效果可能大于该宽度
   * @default 180
   * @example 180
   */
  width?: number;
  /**
   * @description 是否选择监听该组件，设计出来就是为了在出现该图片之后进行网络请求
   * @example true
   */
  observer?: boolean;
  /**
   * @description 在observer为true时，该组件在可视区时执行callback，默认只执行一次。
   */
  callback?: (inView: boolean) => void;
};

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

export default function Image({
  url,
  width = 180,
  fallbackUrl = DefaultFallbackUrl,
  observer,
  callback,
}: ImageProps) {
  const res = useLoading(url),
    { isLoaded, success } = res,
    real_width = width || 180,
    real_fallback_url = fallbackUrl || DefaultFallbackUrl;
  const once_callback = useCallback(Once(callback!!), []);
  return (
    <InView>
      {({ inView, ref, entry }) => (
        <div ref={ref}>
          <img
            width={real_width}
            height={getResizeHeight(res, real_width)}
            src={isLoaded && success ? url : real_fallback_url}
            style={{
              opacity: isLoaded ? 1.0 : 0.09,
            }}
            alt=''
          />
          <>{observer && inView && once_callback(inView)}</>
        </div>
      )}
    </InView>
  );
}

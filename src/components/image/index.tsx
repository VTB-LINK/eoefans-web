import { useMemo, useState } from "react";
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
    if (res.success === false) {
      setObj(() => ({ success: false, isLoaded: true }));
    } else {
      setObj(() => ({ ...res, isLoaded: true }));
    }
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
}: ImageProps) {
  const res = useLoading(url),
    { isLoaded, success } = res,
    real_width = width || 180,
    real_fallback_url = fallbackUrl || DefaultFallbackUrl;
  return (
    <div>
      <img
        width={real_width}
        height={getResizeHeight(res, real_width)}
        src={isLoaded && success ? url : real_fallback_url}
        style={{
          opacity: isLoaded ? 1.0 : 0.09,
        }}
        alt=''
      />
    </div>
  );
}

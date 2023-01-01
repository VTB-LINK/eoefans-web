import { useMemo } from "react";
import { useEffect, useState, memo } from "react";
import { getImageSize, getResizeHeight, fallbackUrl, ImageSize } from "./tool";

type ImageProps = {
  url: string;
};

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

export default function Image({ url }: ImageProps) {
  const res = useLoading(url),
    { isLoaded, success } = res;
  // console.log(res);
  return (
    <div>
      <img
        width={180}
        height={getResizeHeight(res, 180)}
        src={isLoaded && success ? url : fallbackUrl}
        style={{
          opacity: isLoaded ? 1.0 : 0.09,
        }}
        alt=''
      />
    </div>
  );
}

import { useMemo } from "react";
import { useEffect, useState, memo } from "react";
import { getImageSize, getResizeHeight, fallbackUrl, ImageSize } from "./tool";

type ImageProps = {
  url: string;
};

function useLoading(url: string) {
  const [obj, setObj] = useState<ImageSize & { loading: boolean }>({
    width: 0,
    height: 0,
    again: false,
    loading: true,
  });
  useMemo(() => {
    getImageSize(url).then(({ width, height, again }) => {
      setObj(() => ({
        width: width,
        height: height,
        again: again,
        loading: false,
      }));
    });
  }, [url]);
  return { loading: obj.loading, size: obj };
}

export default function Image({ url }: ImageProps) {
  const { loading, size } = useLoading(url);
  console.log({ loading, size });
  return (
    <div>
      <img
        width={180}
        height={getResizeHeight(size, 180)}
        src={loading ? fallbackUrl : url}
        style={{
          opacity: loading ? 0.09 : 1.0,
        }}
        alt=''
      />
    </div>
  );
}

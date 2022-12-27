import { useMemo } from "react";
import { useEffect, useState, memo } from "react";
import { getImageSize, getResizeHeight, fallbackUrl } from "./tool";

type ImageProps = {
  url: string;
};

function useLoading(url: string) {
  const [loading, setLoading] = useState<boolean>(true);
  const [size, setSize] = useState<{ width: number; height: number }>({
    width: 0,
    height: 0,
  });
  useMemo(() => {
    getImageSize(url).then(({ width, height }) => {
      setTimeout(() => {
        setLoading(() => false);
      }, 500);
      setSize(() => ({
        width: width,
        height: height,
      }));
    });
  }, [url]);
  return { loading, size };
}

export default function Image({ url }: ImageProps) {
  const { loading, size } = useLoading(url);
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

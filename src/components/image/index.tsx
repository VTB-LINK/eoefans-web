import { useEffect, useState } from "react";
import { getImageSize } from "./tool";
export default function Image({ url }) {
  const [loading, setLoading] = useState<boolean>(true);
  const [obj, setObj] = useState({});
  useEffect(() => {
    getImageSize(url).then((data) => {
      setLoading(() => false);
      setObj(() => ({
        width: data.width,
        height: data.height,
      }));
    });
  }, [url]);
  if (loading) {
    return <div>loading</div>;
  }
  return (
    <div>
      <img width={obj.width} height={obj.height} src={url} />
    </div>
  );
}

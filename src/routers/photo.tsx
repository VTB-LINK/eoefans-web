import getrealtiveTime from "@utils/time";
import Masonry from "@components/masonry";
export default function PhotoPage() {
  const time = getrealtiveTime(1672570122);
  return (
    <>
      <Masonry />
    </>
  );
}

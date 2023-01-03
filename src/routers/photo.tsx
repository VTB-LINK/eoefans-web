import getrealtiveTime from "@utils/time";
import Masonry from "@components/masonry";
import Image from "@components/image";
import ImageMasonry from "@components/masonry/test";
const url = `https://images.pexels.com/photos/5702958/pexels-photo-5702958.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1`;
export default function PhotoPage() {
  const time = getrealtiveTime(1672570122);
  return (
    <>
      <Masonry />
      {/* <ImageMasonry /> */}
      {/* <Image
        url={url}
        observer={true}
        callback={(inView) => {
          console.log(inView + "123");
        }}
      /> */}
    </>
  );
}

import Masonry from "@components/masonry";

import Image from "@components/image";
export default function App() {
  // return <Masonry />;
  const url = `https://images.pexels.com/photos/5702958/pexels-photo-5702958.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1`;

  return (
    <div>
      <Masonry />
      {/* <Image url={url} /> */}
    </div>
  );
}

import Masonry from "@components/masonry";
import { Link, Outlet } from "react-router-dom";
import Image from "@components/image";
export default function App() {
  // return <Masonry />;
  const url = `https://images.pexels.com/photos/5702958/pexels-photo-5702958.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1`;

  return (
    <div>
      {/* <Masonry /> */}
      {/* <Image url={url} /> */}
      <Link to='/photo'>测试第一个跳转</Link>
      <Link to='/video'>test to video</Link>
      <Link to='/read'>test to read</Link>
      <Outlet />
    </div>
  );
}

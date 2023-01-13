import { Flipped } from "react-flip-toolkit";
import { Outlet } from "react-router-dom";
import Header from "./header";
import Header_Nav from "./nav";
export default function Layout() {
  return (
    <>
      <Header />
      <nav className='feedContainer'>
        <Header_Nav />
      </nav>
      <Flipped flipId={"list"} spring={"veryGentle"}>
        <main>
          <section
          // className=
          >
            <Outlet />
          </section>
        </main>
      </Flipped>
    </>
  );
}

import { Flipped, Flipper } from "react-flip-toolkit";
import { Outlet } from "react-router-dom";
import Header from "./header";
import Header_Nav from "./nav";
import { useAppSelector } from "@store/hooks";
import { selectNavMoreShowed } from "@store/device/index";
export default function Layout() {
  const showed = useAppSelector(selectNavMoreShowed);
  return (
    <>
      <Flipper flipKey={showed} decisionData={showed} spring={"veryGentle"}>
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
      </Flipper>
    </>
  );
}

import { Flipped, Flipper } from "react-flip-toolkit";
import { Outlet } from "react-router-dom";
import Header from "./header";
import Header_Nav from "./nav";
import { useAppSelector } from "@store/hooks";
import { selectNavMoreShowed } from "@store/device/index";
import { useSearchFocus } from "@components/proview/searchFocus";
import styles from "./layout.module.less";
export default function Layout() {
  const showed = useAppSelector(selectNavMoreShowed),
    { focused } = useSearchFocus();

  return (
    <>
      <Flipper
        flipKey={`${showed}-${focused}`}
        decisionData={showed}
        spring={"veryGentle"}
        className={styles["container"]}
      >
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

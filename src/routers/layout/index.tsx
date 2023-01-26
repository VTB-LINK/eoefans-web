import { Flipped, Flipper } from "react-flip-toolkit";
import { Outlet } from "react-router-dom";
import Header from "./header";
import Header_Nav from "./nav";
import { useAppSelector } from "@store/hooks";
import { selectNavMoreShowed } from "@store/device/index";
import styles from "./layout.module.less";
export default function Layout() {
  const showed = useAppSelector(selectNavMoreShowed);
  return (
    <>
      <Flipper
        flipKey={`${showed}`}
        decisionData={showed}
        spring={"veryGentle"}
        className={styles["container"]}
        staggerConfig={{
          default: {
            reverse: false,
            speed: 0.8,
          },
        }}
      >
        <Header />
        <Flipped flipId={"list"}>
          <nav className={"feedContainer " + styles["nav"]}>
            <Header_Nav />
          </nav>
        </Flipped>
        <Flipped flipId={"container"} spring={"veryGentle"}>
          <main className='feedContainer'>
            <Outlet />
          </main>
        </Flipped>
      </Flipper>
    </>
  );
}

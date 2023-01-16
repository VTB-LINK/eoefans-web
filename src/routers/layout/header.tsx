import { useSearchFocus } from "@components/proview/searchFocus";
import { Flipped } from "react-flip-toolkit";
import styles from "./layout.module.less";
import LOGO from "./logo";
import RightSide from "./rightSide";
import Search from "./search";
export default function Header() {
  // const { focused } = useSearchFocus();
  return (
    // <Flipped flipId={"list"} spring={"veryGentle"}>
    <header className={styles["header"]}>
      {/* {!focused && <LOGO />}
        <Search />
        {!focused && <RightSide />} */}
      <LOGO />
    </header>
    // </Flipped>
  );
}

import { useSearchFocus } from "@components/proview/searchFocus";
import { Flipped } from "react-flip-toolkit";
import styles from "./layout.module.less";
import LOGO from "./logo";
import RightSide from "./rightSide";
import Search from "./search";
export default function Header() {
  const { focused } = useSearchFocus();
  return (
    <Flipped flipId={"list"} spring={"veryGentle"}>
      <header
        className={styles["header"]}
        style={{
          justifyContent: focused ? "center" : "space-between",
          height: focused ? "100px" : "40px",
        }}
      >
        {!focused && <LOGO />}
        <Search />
        {!focused && <RightSide />}
      </header>
    </Flipped>
  );
}
//todo 换掉header

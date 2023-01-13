import SearchSharpIcon from "@mui/icons-material/SearchSharp";
import { Form } from "react-router-dom";
import Header_Nav from "./nav";
import styles from "./layout.module.less";
import { useFocus } from "./hooks";
import RouterNav from "./routernav";
import LOGO from "./logo";
import RightSide from "./rightSide";
export default function Header() {
  return (
    <header className={styles["header"]}>
      <LOGO />
      <Search />
      <RightSide />
    </header>
  );
}
//todo 换掉header
//todo 添加搜索
function Search() {
  const { focused, bind } = useFocus();
  return (
    <>
      <div className={styles["search-box"]}>
        <Form
          role='search'
          className={`${styles["search-form"]} ${
            focused ? styles["form-active"] : ""
          }`}
        >
          <div className={styles["search-content"]}>
            <input
              {...bind}
              type='text'
              autoComplete='off'
              maxLength={50}
              className={styles["search-input"]}
              placeholder='尝试在这里搜索些什么'
            />
          </div>
          <div className={styles["search-btn"]}>
            <SearchSharpIcon />
          </div>
        </Form>
      </div>
    </>
  );
}

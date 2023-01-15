import SearchSharpIcon from "@mui/icons-material/SearchSharp";
import { Form } from "react-router-dom";
import styles from "./search.module.less";
import { useSearchFocus } from "@components/proview/searchFocus";
import { Flipped } from "react-flip-toolkit";
export default function Search() {
  const { focused, bind } = useSearchFocus();
  return (
    <>
      <Flipped flipId={"search-box"} spring={"veryGentle"}>
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
      </Flipped>
    </>
  );
}

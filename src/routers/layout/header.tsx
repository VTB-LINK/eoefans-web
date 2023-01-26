import styles from "./layout.module.less";
import LOGO from "./logo";
import { useAppDispatch } from "@store/hooks";
import { Link, useLocation } from "react-router-dom";
import { useEffect, useMemo } from "react";
import { changeLoadingCauseByUrl } from "@store/loading";
export default function Header() {
  const dispatch = useAppDispatch(),
    location = useLocation();
  useEffect(() => {
    dispatch(
      changeLoadingCauseByUrl({
        stateName:
          location.pathname == "/photo" ? "photoIsloading" : "videoIsLoading",
      })
    );
  }, [location.pathname]);
  const JSXRes = useMemo(
    () => (
      <header className={styles["header"]}>
        <LOGO />
        <Link to='/video'>video</Link>
        <Link to='/photo'>photo</Link>
      </header>
    ),
    []
  );
  return <>{JSXRes}</>;
}

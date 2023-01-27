import styles from "./layout.module.less";
import LOGO from "./logo";
import RouterNav from "./routernav";
import { useAppDispatch } from "@store/hooks";
import { useLocation } from "react-router-dom";
import { useEffect, useMemo } from "react";
import { changeLoadingCauseByUrl } from "@store/loading";
import { routerNameToLoading } from "@utils/router";
import { styled } from "@mui/material";
export default function Header() {
  const dispatch = useAppDispatch(),
    location = useLocation();
  useEffect(() => {
    dispatch(
      changeLoadingCauseByUrl({
        stateName: routerNameToLoading(location.pathname),
      })
    );
  }, [location.pathname]);
  const JSXRes = useMemo(
    () => (
      <Header_header className={styles["header"]}>
        <LOGO />
        <RouterNav />
      </Header_header>
    ),
    []
  );
  return <>{JSXRes}</>;
}
const Header_header = styled("header")(({ theme }) => ({
  flexDirection: "row",
  [theme.breakpoints.down("sm")]: {
    flexDirection: "row-reverse",
    justifyContent: "flex-end",
  },
}));

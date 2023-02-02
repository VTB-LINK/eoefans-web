import { Button, Badge } from "@mui/material";
import { useState, useMemo, FC } from "react";
import { H1, Explain, Yituo } from "./modal";
import styles from "./logo.module.less";
import { Storage } from "../tools";

const QAStorage = new Storage("QAUpdate");
//暂时先这样
const _qa_update_time = `2023-2-2`;
const useCheckQANews = () => {
  const local_qa_value = useMemo(() => {
    return QAStorage.getLocalStorage("");
  }, []);
  const [shouldShowNews, set] = useState(local_qa_value !== _qa_update_time),
    handlerReadedNews = () => {
      QAStorage.setLocalstorage(_qa_update_time);
      set(() => false);
    };
  return [shouldShowNews, handlerReadedNews] as [boolean, () => void];
};

export default function LOGO() {
  const [open, set] = useState(false);
  const [shouldShowNews, handlerReadedNews] = useCheckQANews();
  const handlerClick = () => {
    set((open) => !open);
    handlerReadedNews();
  };
  return (
    <div className={styles["logo"]}>
      <H1>
        EOEfans-web端
        <Button
          onClick={handlerClick}
          sx={{
            padding: "0",
            minWidth: "initial",
            position: "absolute",
            transform: "translate(5px,-5px)",
            width: "20px",
          }}
        >
          QA
          <Show_news visible={!shouldShowNews} />
        </Button>
        <Explain open={open} handlerClick={handlerClick} />
      </H1>
      <Yituo width={"64px"} height={"30px"} />
    </div>
  );
}

const Show_news: FC<{ visible: boolean }> = ({ visible }) => (
  <Badge
    color='info'
    variant='dot'
    overlap='circular'
    badgeContent=' '
    sx={{
      transform: "translate(5px,-5px)",
    }}
    invisible={visible}
  >
    <div
      style={{
        width: "0px",
        height: "0px",
      }}
    ></div>
  </Badge>
);

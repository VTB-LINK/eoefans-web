import { useState } from "react";
import { createRoot } from "react-dom/client";
import { nanoid } from "nanoid";
import styles from "./message.module.less";
import MessageContent, { MessageType } from "./message";

type MessageFn = (text: string) => void;
export interface Notice {
  text: string;
  key: string;
  type: MessageType;
}
export interface MessageApi {
  info: MessageFn;
  success: MessageFn;
  warning: MessageFn;
  error: MessageFn;
}

//利用js特性获取内部操作函数
let add: (message: Notice) => void;

const MessageContainer = () => {
  const [mgsList, setList] = useState<Notice[]>([]);
  const timeout = 3000;
  const remove = (msg: Notice) => {
    const { key } = msg;
    setList((prevList) =>
      prevList.filter(({ key: itemKey }) => key !== itemKey)
    );
  };
  add = (msg: Notice) => {
    setList((prevList) => [...prevList, msg]);
    setTimeout(() => {
      remove(msg);
    }, timeout);
  };
  return (
    <>
      {mgsList.map((msg) => (
        <MessageContent {...msg} />
      ))}
    </>
  );
};
//获得container
const getContainer = () => {
  const container = document.querySelector("#MessageWrapper");
  if (!container) {
    const _container = document.createElement("div");
    _container.id = "MessageWrapper";
    _container.className = styles.MessageWrapper;
    document.body.appendChild(_container);
    return _container;
  }
  return container;
};
const message = (function () {
  if (typeof document !== "undefined") {
    let container = createRoot(getContainer());
    container.render(<MessageContainer />);
  }
  const msgType = (type: MessageType) => (text: string) => {
    add({
      text,
      type,
      key: nanoid(4),
    });
  };
  return {
    info: msgType("info"),
  };
})();

export default message;

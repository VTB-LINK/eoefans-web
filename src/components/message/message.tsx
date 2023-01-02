import { FC } from "react";
import styles from "./message.module.less";
export type MessageType = "info";

export interface MessageProps {
  text: string;
  type: MessageType;
}

const MessageContent: FC<MessageProps> = (props: MessageProps) => {
  const { text, type } = props;
  return (
    <div className={styles.message}>
      <p>
        <span>{text}</span>
      </p>
    </div>
  );
};

export default MessageContent;

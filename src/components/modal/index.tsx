import { memo, useState, ReactElement } from "react";
import styles from "./modal.module.less";
import { createPortal } from "react-dom";
import { useEffect } from "react";
import { enableScroll, disableScroll } from "./scrollFn";

type __Click_modal__Type = {
  children: ReactElement;
  visible: boolean;
  closeModal: (event: any) => void;
  resProps: Object;
};

export const __Click_Modal__ = (props: __Click_modal__Type) => {
  const { children, visible, closeModal, ...resProps } = props;
  function handleClick(event: {
    stopPropagation: () => void;
    target: any;
    currentTarget: any;
  }) {
    //点击蒙层本身时关闭模态框，点击模态框内容时不关闭
    event.stopPropagation();
    // event.nativeEvent.stopImmediatePropagation();
    if (event.target === event.currentTarget) {
      closeModal(event);
    }
  }
  let modal;
  typeof document !== "undefined" &&
    (modal = createPortal(
      <div {...resProps} className={styles.modal} onClick={handleClick}>
        {children}
      </div>,
      document.body
    ));
  return <>{visible && modal}</>;
};

type ModalType = {
  isNoScroll: boolean;
  children: ReactElement;
  visible: boolean;
  closeModal: (event: any) => void;
};
export default memo(function Modal(props: ModalType) {
  const { isNoScroll = false, children, ...resProps } = props;
  useEffect(() => {
    if (isNoScroll) {
      disableScroll();
      return enableScroll;
    }
  }, [isNoScroll]);
  //@ts-ignore
  return <__Click_Modal__ {...resProps}>{children}</__Click_Modal__>;
});

type useModalConfigOutputType = {
  visible: boolean;
  isNoScroll: boolean;
  closeModal: () => void;
};

export const useModalConfig = (
  _isvisible: boolean,
  _isNoScroll: boolean
): useModalConfigOutputType => {
  const [isvisible, setVisible] = useState(_isvisible || false);
  const [isNoScroll, setScroll] = useState(_isNoScroll || false);
  const clickFunc = () => {
    setScroll(!isNoScroll);
    setVisible(!isvisible);
  };
  return { visible: isvisible, isNoScroll, closeModal: clickFunc };
};

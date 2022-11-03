import React from "react";

import { CSSTransition } from "react-transition-group";
import Portal from "Portal";

const ModalBase = ({ children, visible, contentClassName, onClose }) => {
  return (
    <CSSTransition in={visible} unmountOnExit classNames="zoom" timeout={200}>
      <Portal
        containerStyle={{ transition: "all 0.2s linear" }}
        contentStyle={{ transition: "all 0.2s linear" }}
        containerClassName="fixed inset-0 z-[9999] flex items-center justify-center"
        contentClassName={contentClassName}
        onClose={onClose}
        overlay
      >
        {children}
      </Portal>
    </CSSTransition>
  );
};

export default ModalBase;

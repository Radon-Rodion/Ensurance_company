import { useEffect } from "react";
import { createPortal } from "react-dom";

interface IModalProps {
  children: JSX.Element;
}

const Modal = (props: IModalProps) => {
  const modalRoot = document.getElementById("modal");
  const el = document.createElement("div");

  useEffect(() => {
    modalRoot?.replaceChildren(el);
  }, []);
  return createPortal(props.children, el);
};

export default Modal;

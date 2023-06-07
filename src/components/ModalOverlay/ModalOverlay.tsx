import { FunctionComponent, ReactNode,  } from "react";
import styles from "./ModalOverlay.module.css";

interface IModalOverlayProps {
  closePopup:Function,
  children:ReactNode
 }

export const ModalOverlay:FunctionComponent<IModalOverlayProps> = ({closePopup, children}) => {
  return (
    <div
      tabIndex={-1}
      className={styles.modal__overlay_visible}
      onClick={() => closePopup}
    >
      {children}
    </div>
  );
}

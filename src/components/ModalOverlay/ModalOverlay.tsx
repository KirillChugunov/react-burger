import { FunctionComponent, ReactNode } from "react";
import styles from "./ModalOverlay.module.css";

interface IModalOverlayProps {
  closePopup: Function;
  children: ReactNode;
  handleClose: Function;
  isOrderModalOpened?: Boolean;
}

export const ModalOverlay: FunctionComponent<IModalOverlayProps> = ({
  closePopup,
  children,
  handleClose,
  isOrderModalOpened,
}) => {
  return (
    <div
      tabIndex={-1}
      className={styles.modal__overlay_visible}
      onClick={() => (isOrderModalOpened ? closePopup() : handleClose())}
    >
      {children}
    </div>
  );
};

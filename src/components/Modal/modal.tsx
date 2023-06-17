import { FunctionComponent, ReactNode, useEffect } from "react";
import styles from "./modal.module.css";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { ModalOverlay } from "../ModalOverlay/ModalOverlay";
import * as ReactDOM from "react-dom";
import { useNavigate } from "react-router-dom";

const modalRoot = document.getElementById("modal") as Element;

interface IModalProps {
  closePopup: () => void;
  children: ReactNode;
  title?: string;
  isOrderModalOpened?: Boolean;
  isIngrModalOpened?: Boolean;
}

export const Modal: FunctionComponent<IModalProps> = ({
  closePopup,
  children,
  title,
  isOrderModalOpened,
}) => {
  const navigate = useNavigate();
  ////////ЗАкрытие попапов на Esc

  useEffect(() => {
    function closeByEscape(evt: KeyboardEvent) {
      if (evt.key === "Escape") {
        isOrderModalOpened ? closePopup() : handleClose();
      }
    }
    document.addEventListener("keydown", closeByEscape);
    return () => {
      document.removeEventListener("keydown", closeByEscape);
    };
  }, []);

  const handleClose = () => {
    navigate(-1);
  };

  return ReactDOM.createPortal(
    <ModalOverlay
      closePopup={closePopup}
      handleClose={handleClose}
      isOrderModalOpened={isOrderModalOpened}
    >
      <div
        className={styles.modal__container}
        onClick={(e) => e.stopPropagation()}
      >
        <div className={`${styles.modal__heading}` + " ml-10 mr-10 mb-0 mt-10"}>
          {title && <p className="text text_type_main-medium">{title}</p>}
          <div className={styles.closeIconContainer}>
            <CloseIcon
              type="primary"
              onClick={isOrderModalOpened ? closePopup : handleClose}
            />
          </div>
        </div>
        {children}
      </div>
    </ModalOverlay>,
    modalRoot
  );
};

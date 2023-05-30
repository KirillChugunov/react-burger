import React, { FunctionComponent, ReactNode, useEffect } from "react";
import styles from "./modal.module.css";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from "prop-types";
import { ModalOverlay } from "../ModalOverlay/ModalOverlay";
import * as ReactDOM from "react-dom";
import { useModal } from "../../hooks/useModal.js";
import { useNavigate } from "react-router-dom";

const modalRoot = document.getElementById("modal") as Element


interface IModalProps {
  closePopup:Function,
  children:ReactNode,
  title?:string
 }


export const Modal:FunctionComponent<IModalProps> = ({closePopup, children, title}) => {
  const navigate = useNavigate();
  ////////ЗАкрытие попапов на Esc
  useEffect(() => {
    function closeByEscape(evt:KeyboardEvent) {
      if (evt.key === "Escape") {
        closePopup();
      }
    }
    document.addEventListener("keydown", closeByEscape);
    return () => {
      document.removeEventListener("keydown", closeByEscape);
    };
  }, []);

  const handleClose = () => {
    if (closePopup) {
      closePopup();
    }
    navigate("/");
  };

  return ReactDOM.createPortal(
    <ModalOverlay closePopup={closePopup}>
      <div
        className={styles.modal__container}
        onClick={(e) => e.stopPropagation()}
      >
        <div className={`${styles.modal__heading}` + " ml-10 mr-10 mb-0 mt-10"}>
          {title && (
            <p className="text text_type_main-medium">{title}</p>
          )}
          <div className={styles.closeIconContainer}>
            <CloseIcon type="primary" onClick={handleClose} />
          </div>
        </div>
        {children}
      </div>
    </ModalOverlay>,
    modalRoot
  );
}


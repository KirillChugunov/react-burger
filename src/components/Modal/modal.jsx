import React, { useState, useEffect } from "react";
import styles from "./modal.module.css";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from "prop-types";
import { ModalOverlay } from "../ModalOverlay/ModalOverlay";
import * as ReactDOM from "react-dom";
import { useModal } from "../../hooks/useModal.js";
import { useNavigate } from "react-router-dom";

const modalRoot = document.getElementById("modal");

export function Modal(props) {
  const navigate = useNavigate();
  ////////ЗАкрытие попапов на Esc
  useEffect(() => {
    function closeByEscape(evt) {
      if (evt.key === "Escape") {
        props.closePopup();
      }
    }
    document.addEventListener("keydown", closeByEscape);
    return () => {
      document.removeEventListener("keydown", closeByEscape);
    };
  }, []);

  const handleClose = () => {
    if (props.closePopup) {
      props.closePopup();
    }
    navigate("/");
  };

  return ReactDOM.createPortal(
    <ModalOverlay>
      <div
        className={styles.modal__container}
        onClick={(e) => e.stopPropagation()}
      >
        <div className={`${styles.modal__heading}` + " ml-10 mr-10 mb-0 mt-10"}>
          {props.title && (
            <p className="text text_type_main-medium">{props.title}</p>
          )}
          <div className={styles.closeIconContainer}>
            <CloseIcon type="primary" onClick={handleClose} />
          </div>
        </div>
        {props.children}
      </div>
    </ModalOverlay>,
    modalRoot
  );
}

Modal.propTypes = {
  closePopup: PropTypes.func,
  title: PropTypes.string,
};

import React from "react";
import styles from "./ModalOverlay.module.css";
import PropTypes from "prop-types";

export function ModalOverlay(props) {
  return (
    <div
      tabIndex={-1}
      className={styles.modal__overlay_visible}
      onClick={props.closePopup}
    >
      {props.children}
    </div>
  );
}

ModalOverlay.propTypes = {
  closePopup: PropTypes.func,
};

import React from "react";
import styles from "./ModalOverlay.module.css";
import PropTypes from 'prop-types';

export function ModalOverlay(props) {
   return (
      <div tabIndex={-1}
        className={styles.modal__overlay_visible}
        onClick={(event) => {
          props.closePopup(event);
        }}>
        {props.children}
      </div>
    );
}

ModalOverlay.propTypes = {
  closePopup: PropTypes.func,
  handdleCloseByEscape: PropTypes.func
};

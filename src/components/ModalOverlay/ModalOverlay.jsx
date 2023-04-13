import React from "react";
import styles from "./ModalOverlay.module.css";
import PropTypes from 'prop-types';

export function ModalOverlay(props) {
  if (
    props.children.props.ingredientPopupisOpen === "true" ||
    props.children.props.orderPopupisOpen === "true"
  )
    return (
      <div 
        className={styles.modal__overlay_visible}
        onClick={(event) => {
          props.children.props.closePopup(event);
        }}
        onKeyDown={(e) => {props.children.props.handdleCloseByEscape(e)}}
      >
        {props.children}
      </div>
    );
}

ModalOverlay.propTypes = {
  closePopup: PropTypes.func,
  handdleCloseByEscape: PropTypes.func
};

import React from "react";
import styles from "./ModalOverlay.module.css";

export function ModalOverlay(props) {
  if (props.children.props.ingredientPopupisOpen === "true")  
  return (
      <div
      className={styles.modal__overlay_visible}
      
      onClick={(event) => {
        props.children.props.closePopup(event);
      }}
    >
       {props.children}
    </div>
  );
}

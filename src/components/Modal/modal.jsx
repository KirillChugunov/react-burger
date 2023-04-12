import React from "react";
import styles from "./modal.module.css";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";

export function Modal(props) {
  return (
    <div className={styles.modal__container} onClick={e => e.stopPropagation()}>
      <div
        style={{ backgroundColor: "#1C1C21", color: "white" }}
        className={`${styles.modal__heading}` + " ml-10 mr-10 mb-0 mt-10"}
      >
        <p className="text text_type_main-large">Детали ингредиента</p>
        <CloseIcon
          type="primary"
          onClick={(event) => {
            props.closePopup(event);
          }}
        />
        </div>
        {props.children}
    </div>
  );
}

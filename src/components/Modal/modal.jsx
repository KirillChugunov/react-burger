import React from "react";
import styles from "./modal.module.css";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";

export function Modal(props) {
   return (
    <div className={props.isOpen === "false" ? `${styles.modal__container}` : `${styles.modal__container_visible}`}>
    <div style={{ backgroundColor: '#1C1C21', color: 'white' }}
    className={`${styles.modal__heading}` + " ml-10 mr-10 mb-0 mt-10"}>
      <p className="text text_type_main-medium">Детали ингридиента</p>
      <CloseIcon type="primary"/>
  </div> 
  </div>
  );
}


import React, { useState, useEffect } from "react";
import styles from "./modal.module.css";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from 'prop-types';
import { ModalOverlay } from "../ModalOverlay/ModalOverlay";
import * as ReactDOM from 'react-dom';
import { useModal } from "../../hooks/useModal.js"

const modalRoot = document.getElementById("modal");

export function Modal(props) {
  const {isModalOpen, openModal, closeModal } = useModal();

return ReactDOM.createPortal(
  (<ModalOverlay closePopup={props.closePopup}>
  <div
      className={styles.modal__container}
      onClick={(e) => e.stopPropagation()}
    >
      <div className={`${styles.modal__heading}` + " ml-10 mr-10 mb-0 mt-10"}
      >
        {props.ingredientPopupisOpen === true && (
          <p className="text text_type_main-large">Детали ингредиента</p>
        )}
        <div className={styles.closeIconContainer}>
          <CloseIcon
            type="primary"
            onClick={(event) => {
              props.closePopup(event);
            }}
          />
        </div>
      </div>
      {props.children}
    </div>
   </ModalOverlay>),
  modalRoot) 
}








// {props.ingredientPopupisOpen === "true" && (
//   <p className="text text_type_main-large">Детали ингредиента</p>
// )}

// export function Modal(props) {
//   return (
//     <div
//       className={styles.modal__container}
//       onClick={(e) => e.stopPropagation()}
//     >
//       <div
//         style={{ backgroundColor: "#1C1C21", color: "white" }}
//         className={`${styles.modal__heading}` + " ml-10 mr-10 mb-0 mt-10"}
//       >
//         {props.ingredientPopupisOpen === "true" && (
//           <p className="text text_type_main-large">Детали ингредиента</p>
//         )}
//         <div className={styles.closeIconContainer}>
//           <CloseIcon
//             type="primary"
//             onClick={(event) => {
//               props.closePopup(event);
//             }}
//           />
//         </div>
//       </div>
//       {props.children}
//     </div>
//   );
// }


// // Modal.propTypes = {
// //   closePopup: PropTypes.func
// // };

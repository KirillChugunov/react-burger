import React, { useState, useEffect } from "react";
import { AppHeader } from "../../components/AppHeader/AppHeader.jsx";
import styles from "./homepage.module.css";
import { BurgerIngredients } from "../../components/BurgerIngredients/BurgerIngredients.jsx";
import { BurgerConstructor } from "../../components/BurgerConstructor/BurgerConstructor.jsx";
import { Modal } from "../../components/Modal/modal.jsx";
import { IngredientDetails } from "../../components/IngredientDetails/IngredientDetails.jsx";
import { OrderDetails } from "../../components/OrderDetails/OrderDetails.jsx";
import { useDispatch, useSelector } from "react-redux";
import { addItem } from "../../services/actions/currentburgeringredients.jsx";
import {
  addCurrentIngredient,
  DELETE_CURRENT_INGREDIENT,
} from "../../services/actions/currentingredient.jsx";
import { getIDsArray, sentOrder } from "../../services/actions/order.jsx";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { v4 as uuidv4 } from "uuid";
import { getFeed } from "../../services/actions/ingredientList.jsx";
import { useModal } from "../../hooks/useModal.js";
import { Outlet } from "react-router-dom";

export function HomePage() {
  const dispatch = useDispatch();
  /////////////////////////////////////////////////////////////Стейты:
  ///Берем кастомный хук
  const {
    closeModal: closeIngrModal,
    isModalOpen: isIngrModalOpened,
    openModal: openIngrModal,
  } = useModal();
  const {
    closeModal: closeOrderrModal,
    isModalOpen: isOrderModalOpened,
    openModal: openOrderModal,
  } = useModal();

  const draggedElements = useSelector(
    (store) => store.currentBurgerIngredients.ingredientsadded
  );
  ///Список ингредиентов, перетянутых в конструктор без булок(объект)
  const draggedElementsAndBuns = useSelector(
    (store) => store.currentBurgerIngredients
  );

  ////////////////Обработчик кнопки заказа
  function handleOrderButton() {
    const idsForOrder = [
      draggedElementsAndBuns.bun._id,
      ...draggedElements.map((item) => item._id),
      draggedElementsAndBuns.bun._id,
    ];
    dispatch(getIDsArray(idsForOrder));
    const newObj = {};
    newObj.ingredients = idsForOrder;
    dispatch(sentOrder(newObj));
    openOrderModal();
  }

  /////Обработчик дропа в конструктор (добавляет уникальный айди и диспатчит его в массив)
  const handleDrop = (itemId) => {
    itemId.unicID = uuidv4();
    dispatch(addItem(itemId));
  };

  React.useEffect(() => {
    dispatch(getFeed());
  }, []);

  /////Удаление элемента из массива

  ////////////Обработчик попапа с игредиентом
  const handleClickForOpenIngredientPopup = (element, event) => {
    event.stopPropagation();
    dispatch(addCurrentIngredient(element));
    openIngrModal();
  };

  ////////Закрытие попапа
  const closePopup = (event) => {
    closeIngrModal();
    closeOrderrModal();
    dispatch({
      type: DELETE_CURRENT_INGREDIENT,
      item: "",
    });
  };

  ////////Рендер приложения

  return (
    <div className={styles.page}>
      <Outlet />
      <DndProvider backend={HTML5Backend}>
        <main className={styles.main}>
          <BurgerIngredients
            handleClickForOpeningredientPopup={
              handleClickForOpenIngredientPopup
            }
          />
          <BurgerConstructor
            handleClickForOpeningredientPopup={
              handleClickForOpenIngredientPopup
            }
            onDropHandler={handleDrop}
            handleOrderButton={handleOrderButton}
          />
        </main>
      </DndProvider>
      {isOrderModalOpened ? (
        <Modal closePopup={closePopup}>
          {isOrderModalOpened === true && <OrderDetails />}
        </Modal>
      ) : null}
    </div>
  );
}

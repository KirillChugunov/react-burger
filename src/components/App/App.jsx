import React, { useState, useEffect } from "react";
import { AppHeader } from "../AppHeader/AppHeader.jsx";
import styles from "./App.module.css";
import { BurgerIngredients } from "../BurgerIngredients/BurgerIngredients.jsx";
import { BurgerConstructor } from "../BurgerConstructor/BurgerConstructor.jsx";
import { Modal } from "../Modal/modal.jsx";
import { IngredientDetails } from "../IngredientDetails/IngredientDetails.jsx";
import { OrderDetails } from "../OrderDetails/OrderDetails.jsx";
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
import { getFeed } from "./../../services/actions/ingredientList.jsx";
import { useModal } from "../../hooks/useModal.js";

function App() {
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
      <AppHeader />
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
      {isIngrModalOpened | isOrderModalOpened ? (
        <Modal
          title={isIngrModalOpened ? "Детали ингредиента" : ""}
          closePopup={closePopup}
        >
          {isIngrModalOpened === true && <IngredientDetails />}

          {isOrderModalOpened === true && <OrderDetails />}
        </Modal>
      ) : null}
    </div>
  );
}

export default App;

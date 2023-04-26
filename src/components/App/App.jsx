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

function App() {
  const dispatch = useDispatch();
  /////////////////////////////////////////////////////////////Стейты:
  ///Поап заказа
  const [orderPopupisOpen, setOrderPopupisOpen] = React.useState(false);
  ///Поап выбранного ингредиента
  const [ingredientPopupisOpen, setIngredientPopupisOpen] =
    React.useState(false);
  ////////////////////////////////////////////////////////Хуки-селекторы:
  ///Список ингредиентов, перетянутых в конструктор без булок(массив)
  const DraggedElements = useSelector(
    (store) => store.currentBurgerIngredients.ingredientsadded
  );
  ///Список ингредиентов, перетянутых в конструктор без булок(объект)
  const DraggedElementsAndBuns = useSelector(
    (store) => store.currentBurgerIngredients
  );

  ////////////////Обработчик кнопки заказа
  function handleOrderButton() {
    const idsForOrder = [
      DraggedElementsAndBuns.bun._id,
      ...DraggedElements.map((item) => item._id),
      DraggedElementsAndBuns.bun._id,
    ];
    dispatch(getIDsArray(idsForOrder));
    const newObj = {};
    newObj.ingredients = idsForOrder;
    dispatch(sentOrder(newObj));
    setOrderPopupisOpen(true);
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
  const handleClickForOpeningredientPopup = (element, event) => {
    event.stopPropagation();
    dispatch(addCurrentIngredient(element));
    setIngredientPopupisOpen(ingredientPopupisOpen === false ? true : false);
  };

  ////////Закрытие попапа
  const closePopup = (event) => {
    setIngredientPopupisOpen(ingredientPopupisOpen === true ? false : false);
    setOrderPopupisOpen(orderPopupisOpen === true ? false : false);
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
            ingredientPopupisOpen={ingredientPopupisOpen}
            handleClickForOpeningredientPopup={
              handleClickForOpeningredientPopup
            }
          />
          <BurgerConstructor
            handleClickForOpeningredientPopup={
              handleClickForOpeningredientPopup
            }
            onDropHandler={handleDrop}
            ingredientPopupisOpen={ingredientPopupisOpen}
            handleOrderButton={handleOrderButton}
          />
        </main>
      </DndProvider>
      {ingredientPopupisOpen | orderPopupisOpen ? (
        <Modal
          ingredientPopupisOpen
          title={
            ingredientPopupisOpen && <p className="text text_type_main-medium">Детали ингредиента</p>
          }
          closePopup={closePopup}
        >
          {ingredientPopupisOpen === true && <IngredientDetails />}

          {orderPopupisOpen === true && <OrderDetails />}
        </Modal>
      ) : null}
    </div>
  );
}

export default App;

import React, { useState, useEffect } from "react";
import { AppHeader } from "./AppHeader/AppHeader.jsx";
import styles from "./App.module.css";
import { BurgerIngredients } from "./BurgerIngredients/BurgerIngredients.jsx";
import { BurgerConstructor } from "./BurgerConstructor/BurgerConstructor.jsx";
import { Modal } from "./Modal/modal.jsx";
import { IngredientDetails } from "./IngredientDetails/IngredientDetails";
import { OrderDetails } from "./OrderDetails/OrderDetails.jsx";

import { useDispatch, useSelector } from "react-redux";
import {
  addItem,
  RESET_INGREDIENT,
} from "../services/actions/currentburgeringredients.jsx";
import { addCurrentIngredient } from "../services/actions/currentingredient.jsx";
import {
  getIDsArray,
  GET_IDS,
  GET_ORDER,
  GET_ORDER_FAILED,
  GET_ORDER_SUCCESS,
} from "../services/actions/order.jsx";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { v4 as uuidv4 } from "uuid";
import { getFeed } from "./Api/api.jsx";

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
////////////////////Конфиги для API:
  const OrderURL = "https://norma.nomoreparties.space/api/orders";
  const config = {
    baseUrl: "https://mesto.nomoreparties.co/v1/wbf-cohort-6",
    headers: {
      authorization: "d1f78d2c-b56d-404a-8b1d-91f3bcf47ed4",
      "Content-Type": "application/json",
    },
  };

  ///////////////Функция работы с API при отправке заказа
  function sentOrder(IDsArray) {
    const newObj = {};
    newObj.ingredients = IDsArray;
    return function (dispatch) {
      dispatch({
        type: GET_ORDER,
      });
      fetch(OrderURL, {
        method: "POST",
        headers: config.headers,
        body: JSON.stringify(newObj),
      })
        .then((res) => {
          if (res.ok) {
            return res.json();
          }
          return Promise.reject(`Ошибка ${res.status}`);
        })
        .then(
          (res) => (
            setOrderPopupisOpen(orderPopupisOpen === false ? true : false),
            dispatch({
              type: GET_ORDER_SUCCESS,
              ordernumber: res.order.number,
            }),
            dispatch({
              type: RESET_INGREDIENT,
            })
          )
        )
        .catch((err) => {
          console.log(err);
          dispatch({
            type: GET_ORDER_FAILED,
          });
        });
    };
  }
////////////////Обработчик кнопки заказа 
  function handleOrderButton() {
    const idsForOrder = [
      DraggedElementsAndBuns.bun._id,
      ...DraggedElements.map((item) => item._id),
      DraggedElementsAndBuns.bun._id,
    ];
    dispatch(getIDsArray(idsForOrder));
    dispatch(sentOrder(idsForOrder));
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
  const deleteElement = () => {
    dispatch({
      type: "DELETE_ELEM",
      item: "",
    });
  };
////////////Обработчик попапа с игредиентом
  const handleClickForOpeningredientPopup = (element) => {
    dispatch(addCurrentIngredient(element));
    setIngredientPopupisOpen(ingredientPopupisOpen === false ? true : false);
  };
////////Закрытие попапа
  const closePopup = (event) => {
    setIngredientPopupisOpen(ingredientPopupisOpen === true ? false : false);
    setOrderPopupisOpen(orderPopupisOpen === true ? false : false);
    deleteElement();
  };

////////ЗАкрытие попапов на Esc

  useEffect(() => {
    function closeByEscape(evt) {
      if (evt.key === "Escape") {
        closePopup();
      }
    }
    document.addEventListener("keydown", closeByEscape);
    return () => {
      document.removeEventListener("keydown", closeByEscape);
    };
  }, []);

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
        <Modal closePopup={closePopup}>
          {ingredientPopupisOpen === true && <IngredientDetails />}

          {orderPopupisOpen === true && <OrderDetails />}
        </Modal>
      ) : null}
    </div>
  );
}

export default App;

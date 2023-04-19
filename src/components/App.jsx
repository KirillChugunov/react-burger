import React, { useState, useEffect } from "react";
import { AppHeader } from "./AppHeader/AppHeader.jsx";
import styles from "./App.module.css";
import { BurgerConstructor } from "./BurgerConstructor/BurgerConstructor.jsx";
import { BurgerIngredients } from "./BurgerIngredients/BurgerIngredients.jsx";
import { Modal } from "./Modal/modal.jsx";
import { IngredientDetails } from "./IngredientDetails/IngredientDetails";
import { OrderDetails } from "./OrderDetails/OrderDetails.jsx"
import { useDispatch, useSelector } from 'react-redux';
import { GET_FEED,   GET_FEED_FAILED, GET_FEED_SUCCESS } from "../services/actions/ingredientList.jsx"

function App() {
  ///Получаем данные с сервера:
  const ingredientsURL = "https://norma.nomoreparties.space/api/ingredients";

  function getFeed() {
    // Воспользуемся первым аргументом из усилителя redux-thunk - dispatch
  return function(dispatch) {
        // Проставим флаг в хранилище о том, что мы начали выполнять запрос
        // Это нужно, чтоб отрисовать в интерфейсе лоудер или заблокировать 
        // ввод на время выполнения запроса
    dispatch({
      type: GET_FEED
    })
        // Запрашиваем данные у сервера
    fetch(ingredientsURL)
    .then(res => {
      if (res.ok) {
          return res.json();
      }
      return Promise.reject(`Ошибка ${res.status}`);
  })
  .then((res) => dispatch({
    type: GET_FEED_SUCCESS,
    feed: res.data
  }))
  .catch( err => {
            // Если сервер не вернул данных, также отправляем экшен об ошибке
            dispatch({
                type: GET_FEED_FAILED
            })
        })
  }
} 

const Ingredients = useSelector(store => store.ingredientList.feed)




















  ///Рендерим через юзэффект
  React.useEffect(() => {
    dispatch(getFeed())
  }, []);

  ///Поапы:
  ////////////////////////////////////////////////////Попап с ингредиентом://////////////////////////////////////////////////
  ///Стейт статуса попапа:
  const [ingredientPopupisOpen, setIngredientPopupisOpen] =
    React.useState(false);

    ///Функция получения данных из элемента по которому кликнули

  const dispatch = useDispatch();

  const getElement = (element) => {
    dispatch({
      type:"ADD_ELEM",
      item: element
    })
  }

  const deleteElement = () => {
    dispatch ({
      type:"DELETE_ELEM",
      item:""
    })
  }

  ///Меняем стейт открытия попапа + заполняем
  const handleClickForOpeningredientPopup = (element, event) => {
    getElement(element)
    setIngredientPopupisOpen(ingredientPopupisOpen === false ? true : false
    );
  };
  //////////////////////////////////////////////////Попап с заказом///////////////////////////////////////////////////////
  ////Стей попапа с заказом:
  const [orderPopupisOpen, setOrderPopupisOpen] = React.useState(false);

  const handleClickForOpenOrderPopup = (event) => {
      setOrderPopupisOpen(orderPopupisOpen === false ? true : false
    );
  };

  ////////////////////////////////////////////////Закрытие попапов
  const closePopup = (event) => {
    setIngredientPopupisOpen(ingredientPopupisOpen === true ? false : false);
    setOrderPopupisOpen(orderPopupisOpen === true ? false : false);
    deleteElement();
  };
  
  useEffect(() => {
    function closeByEscape(evt) {
      if(evt.key === 'Escape') {
          closePopup();
      }
    }
      document.addEventListener('keydown', closeByEscape);
      return () => {
        document.removeEventListener('keydown', closeByEscape);
      }
 
  }, []) 
  
  return (
    <div className={styles.page}>
      <AppHeader />
      <main className={styles.main}>
        <BurgerConstructor
          ingredientPopupisOpen={ingredientPopupisOpen}
          handleClickForOpeningredientPopup={handleClickForOpeningredientPopup}
      />
        <BurgerIngredients
          handleClickForOpenOrderPopup={handleClickForOpenOrderPopup}
          ingredientPopupisOpen={ingredientPopupisOpen}
        />
      </main>
      {ingredientPopupisOpen | orderPopupisOpen ? (
        <Modal closePopup={closePopup}>
          {ingredientPopupisOpen === true && (
            <IngredientDetails />
          )}
          {orderPopupisOpen === true && <OrderDetails />}
        </Modal>
      ) : null}
       </div>
   );
}

export default App;


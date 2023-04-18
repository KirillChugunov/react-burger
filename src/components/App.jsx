import React, { useState, useEffect } from "react";
import { AppHeader } from "./AppHeader/AppHeader.jsx";
import styles from "./App.module.css";
import { BurgerConstructor } from "./BurgerConstructor/BurgerConstructor.jsx";
import { BurgerIngredients } from "./BurgerIngredients/BurgerIngredients.jsx";
import { Modal } from "./Modal/modal.jsx";
import { IngredientDetails } from "./IngredientDetails/IngredientDetails";
import { OrderDetails } from "./OrderDetails/OrderDetails.jsx"

function App() {
  /////стейт массива с ингредиентами
  const [ingredients, setIngredients] = React.useState({
    data: [],
  });
  ///Получаем данные с сервера:
  const ingredientsURL = "https://norma.nomoreparties.space/api/ingredients";
  function getIngredients() {
    fetch(ingredientsURL)
      .then(res => {
        if (res.ok) {
            return res.json();
        }
        return Promise.reject(`Ошибка ${res.status}`);
    })
      .then((res) => setIngredients({ ...ingredients, data: res.data }))
      .catch((error) => console.log(error))
  }

  ///Рендерим через юзэффект
  React.useEffect(() => {
    getIngredients();
  }, []);

  ///Поапы:
  ////////////////////////////////////////////////////Попап с ингредиентом://////////////////////////////////////////////////
  ///Стейт статуса попапа:
  const [ingredientPopupisOpen, setIngredientPopupisOpen] =
    React.useState(false);
  ///Стейт даннх для наполнения попапа:
  const [elementData, setElementData] = React.useState({});
  ///Функция получения данных из элемента по которому кликнули
  function getElementData(item) {
    setElementData(item);
  }
  ///Меняем стейт открытия попапа + заполняем
  const handleClickForOpeningredientPopup = (element, event) => {
    getElementData(element)
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
          getdata={getElementData}
          handleClickForOpeningredientPopup={handleClickForOpeningredientPopup}
          data={ingredients.data}
        />
        <BurgerIngredients
          data={ingredients.data}
          handleClickForOpenOrderPopup={handleClickForOpenOrderPopup}
          ingredientPopupisOpen={ingredientPopupisOpen}
        />
      </main>
      {ingredientPopupisOpen | orderPopupisOpen ? (
        <Modal closePopup={closePopup}>
          {ingredientPopupisOpen === true && (
            <IngredientDetails elementData={elementData} />
          )}
          {orderPopupisOpen === true && <OrderDetails />}
        </Modal>
      ) : null}
       </div>
   );
}

export default App;


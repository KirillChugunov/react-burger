import React, { useState, useEffect } from "react";
import logo from "./logo.svg";
import { Logo } from "@ya.praktikum/react-developer-burger-ui-components";
import { AppHeader } from "./components/AppHeader/AppHeader.jsx";
import styles from "./App.module.css";
import { BurgerConstructor } from "./components/BurgerConstructor/BurgerConstructor.jsx";
import { BurgerIngredients } from "./components/BurgerIngredients/BurgerIngredients.jsx";
import { Modal } from "./components/Modal/modal.jsx";
import { ModalOverlay } from "./components/ModalOverlay/ModalOverlay";
import { IngredientDetails } from "./components/IngredientDetails/IngredientDetails";
import { OrderDetails } from "./components/OrderDetails/OrderDetails.jsx"

function App() {
  /////стейт массива с ингредиентами
  const [ingredients, setIngredients] = React.useState({
    data: [],
  });
  ///Получаем данные с сервера:
  const ingredientsURL = "https://norma.nomoreparties.space/api/ingredients";
  function getIngredients() {
    fetch(ingredientsURL)
      .then((res) => res.json())
      .then((res) => setIngredients({ ...ingredients, data: res.data }))
      .catch((error) => console.log(error))
  }

  ///Рендерим через юзэффект
  React.useEffect(() => {
    getIngredients();
  });

  ///Поапы:
  ////////////////////////////////////////////////////Попап с ингредиентом://////////////////////////////////////////////////
  ///Стейт статуса попапа:
  const [ingredientPopupisOpen, setIngredientPopupisOpen] =
    React.useState("false");
  ///Стейт даннх для наполнения попапа:
  const [elementData, setElementData] = React.useState({});
  ///Функция получения данных из элемента по которому кликнули
  function getElementData(item) {
    setElementData(item);
  }
  ///Меняем стейт открытия попапа + заполняем
  const handleClickForOpeningredientPopup = (element, event) => {
    getElementData(element)
    setIngredientPopupisOpen(ingredientPopupisOpen === "false" ? "true" : "false"
    );
  };
  //////////////////////////////////////////////////Попап с заказом///////////////////////////////////////////////////////
  ////Стей попапа с заказом:
  const [orderPopupisOpen, setOrderPopupisOpen] = React.useState("false");

  const handleClickForOpenOrderPopup = (event) => {
      setOrderPopupisOpen(orderPopupisOpen === "false" ? "true" : "false"
    );
  };

  ////////////////////////////////////////////////Закрытие попапов
  const closePopup = (event) => {
    setIngredientPopupisOpen(ingredientPopupisOpen === "true" ? "false" : "false");
    setOrderPopupisOpen(orderPopupisOpen === "true" ? "false" : "false");
  };
   /////////////////////////////////////////////Обработчик закрытия
  const handdleCloseByEscape = (event) => {
    if (event.key === "Escape") {
      closePopup(event)
    }
  }

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
      <ModalOverlay>
        <Modal ingredientPopupisOpen={ingredientPopupisOpen} orderPopupisOpen={orderPopupisOpen}
          closePopup={closePopup} handdleCloseByEscape={handdleCloseByEscape}>
          {ingredientPopupisOpen === "true" && <IngredientDetails elementData={elementData}/>}
          {orderPopupisOpen === "true" && <OrderDetails />}
                   </Modal>
    </ModalOverlay>
       </div>
   );
}

export default App;

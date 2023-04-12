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

function App() {
  /////стейт массива с ингредиентами
  const [ingredients, setIngredients] = React.useState({
    data: [],
  });
  ///Получаем данные с сервера:
  const ingredientsURL = "https://norma.nomoreparties.space/api/ingredients"
  function getIngredients() {
    fetch(ingredientsURL)
      .then((res) => res.json())
      .then((res) => setIngredients({ ...ingredients, data: res.data }));
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
    getElementData(element);
    setIngredientPopupisOpen(
      ingredientPopupisOpen === "false" ? "true" : "false"
    );
  };
  //////////////////////////////////////////////////Попап с заказом///////////////////////////////////////////////////////
  ////Стей попапа с заказом:
  const [orderPopupisOpen, setOrderPopupisOpen] = React.useState("false");
  const handleClickForOpenOrderPopup = (event) => {
    setIngredientPopupisOpen(ingredientPopupisOpen === "false" ? "true" : "false"
    );
  };

  ////////////////////////////////////////////////Закрытие попапов
  const closePopup = (event) => {
    {
      console.log(event.target);
    }
    setIngredientPopupisOpen(
      ingredientPopupisOpen === "true" ? "false" : "false"
    );
    // if (orderPopupisOpen === "true") {orderPopupisOpen = false}
  };

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
        <BurgerIngredients data={ingredients.data} />
      </main>
      <ModalOverlay>
        <Modal
          ingredientPopupisOpen={ingredientPopupisOpen}
          closePopup={closePopup}>
         <IngredientDetails elementData={elementData} />
        </Modal>
      </ModalOverlay>
    </div>
  );
}

export default App;

import React, { useState, useEffect } from "react";
import logo from "./logo.svg";
import { Logo } from "@ya.praktikum/react-developer-burger-ui-components";
import { AppHeader } from "./components/AppHeader/AppHeader.jsx";
import styles from "./App.module.css";
import { BurgerConstructor } from "./components/BurgerConstructor/BurgerConstructor.jsx";
import { BurgerIngredients } from "./components/BurgerIngredients/BurgerIngredients.jsx";
import { Modal } from "./components/Modal/modal.jsx";

function App() {
  const [ingredients, setIngredients] = React.useState({
    data: [],
  });
  const [isOpen, setToggleModal] = React.useState("false");
  const [elementData, setElementData] = React.useState({})
  const toggleModal = (element) => {
    console.log("privet");
    getData(element)
    setToggleModal(isOpen === "false" ? "true" : "false");
  };

  function getData(item) {
     setElementData(item)
  }
  

  function getIngredients() {
    fetch("https://norma.nomoreparties.space/api/ingredients")
      .then((res) => res.json())
      .then((res) => setIngredients({ ...ingredients, data: res.data }));
  }

  React.useEffect(() => {
    getIngredients();
  });

  return (
    <div className={styles.page}>
      <AppHeader />
      <main className={styles.main}>
        <BurgerConstructor getdata={getData} toggleModal={toggleModal} data={ingredients.data} />
        <BurgerIngredients data={ingredients.data} />
      </main>
      <Modal isOpen={isOpen} elementData={elementData}/>
    </div>
  );
}

export default App;

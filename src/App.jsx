import React, { useState, useEffect } from "react";
import logo from "./logo.svg";
import { Logo } from "@ya.praktikum/react-developer-burger-ui-components";
import { AppHeader } from "./components/AppHeader/AppHeader.jsx";
import styles from "./App.module.css";
import { BurgerConstructor } from "./components/BurgerConstructor/BurgerConstructor.jsx";
// import { BurgerIngredients} from "./components/BurgerIngredients/BurgerIngredients.jsx"

function App() {
  const [ingredients, setIngredients] = React.useState({
    data: [],
  });

  function getIngredients() {
    fetch("https://norma.nomoreparties.space/api/ingredients")
      .then((res) => res.json())
      .then((zalupa) => setIngredients({ ...ingredients, data: zalupa.data }));
  }

  React.useEffect(() => {
    getIngredients();
    console.log(ingredients.data);
  });

  return (
        <div className={styles.page}>
            <AppHeader />
            <main>
              <BurgerConstructor data={ingredients.data}/>
            </main>
          </div>
        );
     }


export default App;

import React, { useState, useEffect } from "react";
import logo from "./logo.svg";
import { Logo } from "@ya.praktikum/react-developer-burger-ui-components";
import { AppHeader } from "./components/AppHeader/AppHeader.jsx";
import styles from "./App.module.css";
import { BurgerConstructor } from "./components/BurgerConstructor/BurgerConstructor.jsx";
// import { BurgerIngredients} from "./components/BurgerIngredients/BurgerIngredients.jsx"

function Ingredients() {
  const [ingredients, setIngredients] = React.useState({
    data: [],
  });

  function getIngredients() {
    fetch("https://norma.nomoreparties.space/api/ingredients")
      .then((res) => res.json())
      .then((data) => setIngredients({ ...ingredients, data: data.data }));
  }

  React.useEffect(() => {
    getIngredients();
    console.log(ingredients.data);
  });

return (
  <div>
  {ingredients.data.map((element) => {
    return (
    <div key = {element.id}>
    <img src = {element.image}></img>
    <h1>{element.name}</h1>
    <h1>{element.price}</h1>
    </div>)
  })}
  </div>
)  
}



function App() {
    return (
      <div className={styles.page}>
       <AppHeader />
        <main>
          <BurgerConstructor  />
          <Ingredients />
          {/* <BurgerIngredients /> */}
        </main>
      </div>
    );
  }


export default App;

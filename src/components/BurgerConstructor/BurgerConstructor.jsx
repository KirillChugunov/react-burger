import React from "react";
import styles from "./BurgerConstructor.module.css";
import {
  Tab,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";

export function BurgerConstructor(props) {
  const handleClickForOpeningredientPopup = props.handleClickForOpeningredientPopup;
  const [current, setCurrent] = React.useState("one");
  return (
    <section className={styles.bgconstuctor__container}>
      <div className="mt-10 mb-5">
        <h2 className={"text text_type_main-large"}>Соберите бургер</h2>
      </div>
      <div style={{ display: "flex" }}>
        <Tab value="one" active={current === "one"} onClick={setCurrent}>
        Булки
        </Tab>
        <Tab value="two" active={current === "two"} onClick={setCurrent}>
        Соусы
        </Tab>
        <Tab value="three" active={current === "three"} onClick={setCurrent}>
        Начинки
        </Tab>
      </div>
      <div className={styles.menu__container}>
      <div className="mt-10">
        <h3 className="text text_type_main-medium">Булки</h3>
      </div>
      <ul className={styles.ingredients__container}>
        {props.data.map((element) => {
          if (element.type === "bun") {
            return (
              <li
                className={
                  `${styles.inglist__container}` + " ml-4 mr-1 mb-10 mt-0"
                }
                key={element._id}
                onClick={() => {
                  handleClickForOpeningredientPopup(element);
                }}
              >
                <div className="ml-4 mr-4 mb-1 mt-0">
                  <img src={element.image}></img>
                </div>
                <div className={`${styles.price__container}` + " mb-1 mt-1"}>
                  <CurrencyIcon type="primary" />
                  <p className="text text_type_digits-default">
                    {element.price}
                  </p>
                </div>
                <p
                  className={
                    `${styles.name__text}` + " text text_type_main-default"
                  }
                >
                  {element.name}
                </p>
              </li>
            );
          }
        })}
      </ul>

      <div className="mt-10">
        <h3 className="text text_type_main-medium">Соусы</h3>
      </div>
      <ul className={styles.ingredients__container}>
        {props.data.map((element) => {
          if (element.type === "sauce") {
            return (
              <li
                className="ml-4 mr-1 mb-10 mt-0"
                key={element._id}
                onClick={() => {
                  handleClickForOpeningredientPopup(element);
                }}
              >
                <div className="ml-4 mr-4 mb-1 mt-0">
                  <img src={element.image}></img>
                </div>
                <div className={`${styles.price__container}` + " mb-1 mt-1"}>
                  <CurrencyIcon type="primary" />
                  <p className="text text_type_digits-default">
                    {element.price}
                  </p>
                </div>
                <p
                  className={
                    `${styles.name__text}` + " text text_type_main-default"
                  }
                >
                  {element.name}
                </p>
              </li>
            );
          }
        })}
      </ul>

      <div className="mt-10">
        <h3 className="text text_type_main-medium">Начинки</h3>
      </div>
      <ul className={styles.ingredients__container}>
        {props.data.map((element) => {
          if (element.type === "main") {
            return (
              <li
                className="ml-4 mr-1 mb-10 mt-0"
                key={element._id}
                onClick={() => {
                  handleClickForOpeningredientPopup(element);
                }}
              >
                <div className="ml-4 mr-4 mb-1 mt-0">
                  <img src={element.image}></img>
                </div>
                <div className={`${styles.price__container}` + " mb-1 mt-1"}>
                  <CurrencyIcon type="primary" />
                  <p className="text text_type_digits-default">
                    {element.price}
                  </p>
                </div>
                <p
                  className={
                    `${styles.name__text}` + " text text_type_main-default"
                  }
                >
                  {element.name}
                </p>
              </li>
            );
          }
        })}
      </ul>
      </div>
    </section>
  );
}

import React from "react";
import styles from "./BurgerConstructor.module.css";
import {
  Tab,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
// import { ADD_ELEM } from "../../services/actions/currentingredient";
import { DraggableElement } from "./../draggableElement/DragabbleElement";

export function BurgerConstructor(props) {
  const Ingredients = useSelector((store) => store.ingredientList.feed);
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
          {Ingredients.map((element, index) => {
            if (element.type === "bun") {
               return (
                <DraggableElement element={element} key={element._id} index={index}>
                  <li
                    className={
                      `${styles.inglist__container}` + " ml-4 mr-1 mb-10 mt-0"
                    }
                                   onClick={() => {
                      props.handleClickForOpeningredientPopup(element);
                    }}
                  >
                    <div className="ml-4 mr-4 mb-1 mt-0">
                      <img src={element.image}></img>
                    </div>
                    <div
                      className={`${styles.price__container}` + " mb-1 mt-1"}
                    >
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
                </DraggableElement>
              );
            }
          })}
        </ul>

        <div className="mt-10">
          <h3 className="text text_type_main-medium">Соусы</h3>
        </div>
        <ul className={styles.ingredients__container}>
          {Ingredients.map((element, index) => {
            if (element.type === "sauce") {
              return (
                <DraggableElement element={element} key={element._id} index={index}>
                  <li
                    className="ml-4 mr-1 mb-10 mt-0"
                   
                    onClick={() => {
                      props.handleClickForOpeningredientPopup(element);
                    }}
                  >
                    <div className="ml-4 mr-4 mb-1 mt-0">
                      <img src={element.image}></img>
                    </div>
                    <div
                      className={`${styles.price__container}` + " mb-1 mt-1"}
                    >
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
                </DraggableElement>
              );
            }
          })}
        </ul>

        <div className="mt-10">
          <h3 className="text text_type_main-medium">Начинки</h3>
        </div>
        <ul className={styles.ingredients__container}>
          {Ingredients.map((element, index) => {
            if (element.type === "main") {
              return (
                <DraggableElement element={element} key={element._id} index={index}>
                  <li
                    className="ml-4 mr-1 mb-10 mt-0"
                    onClick={() => {
                      props.handleClickForOpeningredientPopup(element);
                    }}
                  >
                    <div className="ml-4 mr-4 mb-1 mt-0">
                      <img src={element.image}></img>
                    </div>
                    <div
                      className={`${styles.price__container}` + " mb-1 mt-1"}
                    >
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
                </DraggableElement>
              );
            }
          })}
        </ul>
      </div>
    </section>
  );
}

BurgerConstructor.propTypes = {
  data: PropTypes.array,
  handleClickForOpeningredientPopup: PropTypes.func,
};

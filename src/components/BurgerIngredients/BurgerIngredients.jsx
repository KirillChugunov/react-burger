import React from "react";
import styles from "./BurgerIngredients.module.css";
import {
  Tab,
  CurrencyIcon,
  Counter,
} from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { DraggableElement } from "../draggableElement/DragabbleElement";
import { getBoundingClientRect, useRef, useEffect } from "react";

export function BurgerIngredients({ handleClickForOpeningredientPopup }) {
 ////////////////////////////////////////////////////////Хуки-селекторы:
  ///Список ингредиентов, перетянутых в конструктор без булок(массив)
  const DraggedElements = useSelector(
    (store) => store.currentBurgerIngredients.ingredientsadded
  );
///Список ингредиентов, перетянутых в конструктор без булок(объект)
  const DraggedElementsAndBuns = useSelector(
    (store) => store.currentBurgerIngredients
  );
///Список ингредиентов с API
  const Ingredients = useSelector((store) => store.ingredientList.feed);
////Стейт из библиотеки для табов
  const [current, setCurrent] = React.useState("one");
////Рефы разметки для скролла
  const bunRef = useRef();
  const sauseRef = useRef();
  const mainRef = useRef();
  const scrollContainer = useRef();
  const tabsRef = useRef();
////Обрабочик скролла
  function onScrollHandler() {
    const BunTopCoord = bunRef.current.getBoundingClientRect();
    const SauseTopCoord = sauseRef.current.getBoundingClientRect();
    const MainTopCoord = mainRef.current.getBoundingClientRect();
    if (BunTopCoord.top > 0 && BunTopCoord.top < SauseTopCoord.top && current) {
      setCurrent("one");
    } else if (
      SauseTopCoord.top > 0 &&
      SauseTopCoord.top < MainTopCoord.top &&
      BunTopCoord.top < 0
    ) {
      setCurrent("two");
    } else if (
      MainTopCoord.top > 0 &&
      SauseTopCoord.top < 0 &&
      BunTopCoord.top < 0
    ) {
      setCurrent("three");
    }
  }

  //////Сняли/повесили слушателя на скролл
  useEffect(() => {
    scrollContainer.current.addEventListener("scroll", onScrollHandler);

    return () => {
      scrollContainer.current.removeEventListener("scroll", onScrollHandler);
    };
  });

  /////Функция для наполнения счетчика выбранных элементов
  function itemCount(element) {
    let itemCount = [];
    return (itemCount = DraggedElements.filter(
      (item) => item._id === element._id
    ).length);
  }

//////Отдельно для булок с учетом структуры хранилища
  function BunCount(bun) {
    let currentBun = "";
    return DraggedElementsAndBuns.bun != null &&
      bun.name === DraggedElementsAndBuns.bun.name
      ? 1
      : 0;
  }

///////Функция скролла к конкретному блоку в зависимости от стейта.
  useEffect(() => {
    current === "one" && bunRef.current.scrollIntoView();
    current === "two" && sauseRef.current.scrollIntoView();
    current === "three" && mainRef.current.scrollIntoView();
  });
//////Рендер
  return (
    <section className={styles.bgconstuctor__container}>
      <div className="mt-10 mb-5">
        <h2 className={"text text_type_main-large"}>Соберите бургер</h2>
      </div>
      <div className="tabs" style={{ display: "flex" }}>
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
      <div ref={scrollContainer} className={styles.menu__container}>
        <div ref={bunRef} className="mt-10">
          <h3 className="text text_type_main-medium">Булки</h3>
        </div>
        <ul className={styles.ingredients__container}>
          {Ingredients.map((element, index) => {
            if (element.type === "bun") {
              return (
                <DraggableElement
                  element={element}
                  key={element._id}
                  index={index}
                >
                  <li
                    className={
                      `${styles.inglist__container}` + " ml-4 mr-1 mb-10 mt-0"
                    }
                    onClick={() => handleClickForOpeningredientPopup(element)}
                  >
                    <div className="ml-4 mr-4 mb-1 mt-0">
                      <Counter
                        count={BunCount(element)}
                        size="default"
                        extraClass="m-1"
                      />
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

        <div ref={sauseRef} className="mt-10">
          <h3 className="text text_type_main-medium">Соусы</h3>
        </div>
        <ul className={styles.ingredients__container}>
          {Ingredients.map((element, index) => {
            if (element.type === "sauce") {
              return (
                <DraggableElement
                  element={element}
                  key={element._id}
                  index={index}
                >
                  <li
                    className={
                      `${styles.inglist__container}` + " ml-4 mr-1 mb-10 mt-0"
                    }
                    onClick={() => handleClickForOpeningredientPopup(element)}
                  >
                    <div className="ml-4 mr-4 mb-1 mt-0">
                      <Counter
                        count={itemCount(element)}
                        size="default"
                        extraClass="m-1"
                      />
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

        <div ref={mainRef} className="mt-10">
          <h3 className="text text_type_main-medium">Начинки</h3>
        </div>
        <ul className={styles.ingredients__container}>
          {Ingredients.map((element, index) => {
            if (element.type === "main") {
              return (
                <DraggableElement
                  element={element}
                  key={element._id}
                  index={index}
                >
                  <li
                    className={
                      `${styles.inglist__container}` + " ml-4 mr-1 mb-10 mt-0"
                    }
                    onClick={() => handleClickForOpeningredientPopup(element)}
                  >
                    <div className="ml-4 mr-4 mb-1 mt-0">
                      <Counter
                        count={itemCount(element)}
                        size="default"
                        extraClass="m-1"
                      />
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

BurgerIngredients.propTypes = {
  data: PropTypes.array,
  handleClickForOpeningredientPopup: PropTypes.func,
};

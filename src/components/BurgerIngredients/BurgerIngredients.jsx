import React from "react";
import styles from "./BurgerIngredients.module.css";
import {
  Tab,
  CurrencyIcon,
  Counter,
} from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { DraggableElement } from "../draggableElement/DragabbleElement";
import { useRef, useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { Link, useLocation } from "react-router-dom";
import { v4 as uuidv4 } from 'uuid';

export function BurgerIngredients() {
  const location = useLocation();
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

  ////// Хуки обсервера
  const [bunHeadingRef, inViewBun] = useInView({ threshold: 0 });
  const [sauseHeadingRef, inViewSause] = useInView({ threshold: 0 });
  const [mainHeadingRef, inViewMain] = useInView({ threshold: 0 });

  //////Подсветка в зависимости от inView хука. 
  useEffect(() => {
    if (inViewBun) {
      setCurrent("one");
    } else if (inViewSause) {
      setCurrent("two");
    } else if (inViewMain) {
      setCurrent("three");
    }
  }, [inViewBun, inViewSause, inViewMain]);

  /////Функция для наполнения счетчика выбранных элементов
  function itemCount(element) {
    let itemCount = [];
    return (itemCount = DraggedElements.filter(
      (item) => item._id === element._id
    ).length);
  }

  //////Отдельно для булок с учетом структуры хранилища
  function BunCount(bun) {
    return DraggedElementsAndBuns.bun != null &&
      bun.name === DraggedElementsAndBuns.bun.name
      ? 1
      : 0;
  }

  /////Функция скролла к конкретному блоку в зависимости от стейта.

  const handleTabClick = (section, activeState) => {
    setCurrent(activeState);
    section.current.scrollIntoView({ behavior: "smooth" });
  };

  ////Рендер
  return (
    <section className={styles.bgconstuctor__container}>
      <div className="mt-10 mb-5">
        <h2 className={"text text_type_main-large"}>Соберите бургер</h2>
      </div>
      <div ref={tabsRef} className={`${styles.tabs_container}` + " tabs"}>
        <Tab
          value="one"
          active={current === "one"}
          onClick={() => handleTabClick(bunRef, "one")}
        >
          Булки
        </Tab>
        <Tab
          value="two"
          active={current === "two"}
          onClick={() => handleTabClick(sauseRef, "two")}
        >
          Соусы
        </Tab>
        <Tab
          value="three"
          active={current === "three"}
          onClick={() => handleTabClick(mainRef, "three")}
        >
          Начинки
        </Tab>
      </div>
      <div ref={scrollContainer} className={styles.menu__container}>
        <div ref={bunRef} className="mt-10">
          <h3 ref={bunHeadingRef} className="text text_type_main-medium">
            Булки
          </h3>
        </div>
        <ul className={styles.ingredients__container}>
          {Ingredients.map((element) => {
            if (element.type === "bun") {
              return (
                <Link className={styles.link} key={uuidv4()}
                to={`/ingredients/${element._id}`} state={{background: location}}>
                <DraggableElement
                  element={element}
                  key={element._id}
                  
                >
                  <li
                    className={
                      `${styles.inglist__container}` + " ml-4 mr-1 mb-10 mt-0"
                    }
                  
                  >
                    <div className="ml-4 mr-4 mb-1 mt-0">
                      <Counter
                        count={BunCount(element)}
                        size="default"
                        extraClass="m-1"
                      />
                      <img
                        src={element.image}
                        alt={`изображение ${element.name}`}
                      ></img>
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
                </DraggableElement></Link>
              );
            }
          })}
        </ul>

        <div ref={sauseRef} className="mt-10">
          <h3 ref={sauseHeadingRef} className="text text_type_main-medium">
            Соусы
          </h3>
        </div>
        <ul className={styles.ingredients__container}>
          {Ingredients.map((element) => {
            if (element.type === "sauce") {
              return (
                <Link className={styles.link} key={uuidv4()}
                to={`/ingredients/${element._id}`} state={{background: location}}>
                <DraggableElement
                  element={element}
                  key={element._id}
                                  >
                  <li
                    className={
                      `${styles.inglist__container}` + " ml-4 mr-1 mb-10 mt-0"
                    }
                  
                  >
                    <div className="ml-4 mr-4 mb-1 mt-0">
                      <Counter
                        count={itemCount(element)}
                        size="default"
                        extraClass="m-1"
                      />
                      <img
                        src={element.image}
                        alt={`изображение ${element.name}`}
                      ></img>
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
                </Link>
              );
            }
          })}
        </ul>

        <div ref={mainRef} className="mt-10">
          <h3 ref={mainHeadingRef} className="text text_type_main-medium">
            Начинки
          </h3>
        </div>
        <ul className={styles.ingredients__container}>
          {Ingredients.map((element) => {
            if (element.type === "main") {
              return (
                <Link className={styles.link} key={uuidv4()}
                to={`/ingredients/${element._id}`} state={{background: location}}>
                <DraggableElement element={element} key={element._id}>
                  <li
                    className={
                      `${styles.inglist__container}` + " ml-4 mr-1 mb-10 mt-0"
                    }
                  
                  >
                    <div className="ml-4 mr-4 mb-1 mt-0">
                      <Counter
                        count={itemCount(element)}
                        size="default"
                        extraClass="m-1"
                      />
                      <img
                        src={element.image}
                        alt={`изображение ${element.name}`}
                      ></img>
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
                </Link>
              );
            }
          })}
        </ul>
      </div>
    </section>
  );
}

BurgerIngredients.propTypes = {
  handleClickForOpeningredientPopup: PropTypes.func,
};

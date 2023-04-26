import React from "react";
import { useDrop } from "react-dnd";
import styles from "./BurgerConstructor.module.css";
import {
  ConstructorElement,
  CurrencyIcon,
  Button,
  DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { DragnDropElement } from "../DragnDropElement/DragnDropElement";
import { v4 as uuidv4 } from "uuid";
import {
  sortIngredientConstructor,
  deleteItem,
} from "../../services/actions/currentburgeringredients";

export function BurgerConstructor({
  onDropHandler,
  handleOrderButton,
  handleClickForOpeningredientPopup,
}) {
  const dispatch = useDispatch();

  ////////////////////////////////////////////////////////Хуки-селекторы:
  ///Список ингредиентов, перетянутых в конструктор без булок(массив)
  const DraggedElements = useSelector(
    (store) => store.currentBurgerIngredients.ingredientsadded
  );
  ///Список ингредиентов, перетянутых в конструктор без булок(объект)
  const DraggedElementsAndBuns = useSelector(
    (store) => store.currentBurgerIngredients
  );

  /////Калькулятор цены заказа для отображения
  function calculatePrice() {
    let IngredientsPriceArray = [];
    let total = 0;
    if (DraggedElementsAndBuns.bun != null) {
      IngredientsPriceArray = [
        DraggedElementsAndBuns.bun.price,
        ...DraggedElements.map((item) => item.price),
        DraggedElementsAndBuns.bun.price,
      ];
      return IngredientsPriceArray.reduce((partialSum, a) => partialSum + a, 0);
    } else {
      return 0;
    }
  }
  //////////Обработчик дроптаргета
  const [, dropRef] = useDrop({
    accept: ["main", "sauce", "bun"],
    drop(item) {
      onDropHandler(item);
    },
  });

  /////////Сотируем элементы и диспатчим массив в хранилище
  const moveDraggedElements = (dragIndex, hoverIndex) => {
    const dragIngredient = DraggedElements[dragIndex];
    const updateddraggedElements = [...DraggedElements];
    updateddraggedElements.splice(dragIndex, 1);
    updateddraggedElements.splice(hoverIndex, 0, dragIngredient);
    dispatch(sortIngredientConstructor(updateddraggedElements));
  };

  //////Обработчик удаления
  function handleItemDelete(element) {
    dispatch(deleteItem(element.unicID));
  }

  return (
    <section>
      <div
        className={`${styles.BurgerIngredients__container}` + " mt-25"}
        ref={dropRef}
      >
        {DraggedElementsAndBuns.bun != null && (
          <div
            className="pl-8"
            // onClick={(event) =>
            //   handleClickForOpeningredientPopup(DraggedElementsAndBuns.bun, event)
            // }
          >
            <ConstructorElement
              type="top"
              isLocked={true}
              text={`${DraggedElementsAndBuns.bun.name}(верх)`}
              price={DraggedElementsAndBuns.bun.price}
              thumbnail={DraggedElementsAndBuns.bun.image}
              handleClose={() => handleItemDelete(DraggedElementsAndBuns.bun)}
              key={DraggedElementsAndBuns.bun.unicID}
            />
          </div>
        )}
        <div className={styles.mainandsauce__container}>
          {DraggedElements.map((element, index) => {
            if (element.type === "main" || element.type === "sauce") {
              return (
                <DragnDropElement
                  type="dragged"
                  key={element.unicID}
                  element={element}
                  index={index}
                  moveDraggedElements={moveDraggedElements}
                >
                  <div
                    className={styles.itemcontainer}
                    // onClick={(event) => handleClickForOpeningredientPopup(element,event)}
                  >
                    <DragIcon type="primary" />
                    <ConstructorElement
                      text={element.name}
                      price={element.price}
                      thumbnail={element.image}
                      handleClose={() => handleItemDelete(element)}
                    />
                  </div>
                </DragnDropElement>
              );
            }
          })}
        </div>

        {DraggedElementsAndBuns.bun != null && (
          <div
            className="pl-8"
            // onClick={(event) =>
            //   handleClickForOpeningredientPopup(DraggedElementsAndBuns.bun, event)
            // }
          >
            <ConstructorElement
              type="bottom"
              isLocked={true}
              text={`${DraggedElementsAndBuns.bun.name}(низ)`}
              price={DraggedElementsAndBuns.bun.price}
              thumbnail={DraggedElementsAndBuns.bun.image}
              handleClose={() => handleItemDelete(DraggedElementsAndBuns.bun)}
              key={DraggedElementsAndBuns.bun.unicID}
            />
          </div>
        )}

        <div className={`${styles.order__end__container}` + " mt-10 mr-4"}>
          <div className={`${styles.flex__container}` + " mr-4"}>
            <p className="text text_type_digits-medium">{calculatePrice()}</p>
            <CurrencyIcon type="primary" />
          </div>
          <div className={styles.flex__container}>
            {DraggedElements.length != 0 && (
              <Button
                htmlType="button"
                type="primary"
                size="large"
                onClick={handleOrderButton}
              >
                Оформить заказ
              </Button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

BurgerConstructor.propTypes = {
  data: PropTypes.array,
};

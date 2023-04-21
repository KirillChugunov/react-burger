import React from "react";
import { useDrop } from "react-dnd";
import { useCallback } from "react";
import styles from "./BurgerIngredients.module.css";
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
import { sortIngredientConstructor } from "../../services/actions/currentburgeringredients";
import update from 'immutability-helper';
export function BurgerIngredients({onDropHandler,
  handleClickForOpenOrderPopup,
}) 

{

  const dispatch = useDispatch()
  const DraggedElements = useSelector(
    (store) => store.currentBurgerIngredients.ingredientsadded
  );
  const [, dropRef] = useDrop({
    accept: ["main", "sauce", "bun"],
    drop(item) {
      onDropHandler(item);
    },
  });
 
  const moveDraggedElements = (dragIndex, hoverIndex) => {
    const dragIngredient = DraggedElements[dragIndex];
    const updateddraggedElements = [...DraggedElements];
    updateddraggedElements.splice(dragIndex, 1);
    updateddraggedElements.splice(hoverIndex, 0, dragIngredient);
    dispatch(sortIngredientConstructor(updateddraggedElements))
     console.log(DraggedElements)
  };


  return (
    <div
      ref={dropRef}
      style={{ display: "flex", flexDirection: "column", gap: "10px" }}
      className={`${styles.BurgerIngredients__container}`}
    >
      <div className="pt-25">
        {DraggedElements.map((element) => {
          {
          }
          if (element.name === "Краторная булка N-200i") {
            return (
              <div className="pl-8">
                <ConstructorElement
                  type="top"
                  isLocked={true}
                  text={element.name}
                  price={element.price}
                  thumbnail={element.image}
                />
              </div>
            );
          }
        })}
      </div>
      <div className={styles.mainandsauce__container}>
        {DraggedElements.map((element, index) => {
          if (element.type === "main" || element.type === "sauce") {
            console.log(DraggedElements)
                console.log(element)
              return (
                 <DragnDropElement
                 type="dragged"
                key={element.unicID}
                element={element}
                index={index}
                moveDraggedElements={moveDraggedElements}
              >
                <div className={styles.itemcontainer}>
                  <DragIcon type="primary" />
                  <ConstructorElement
                    text={element.name}
                    price={element.price}
                    thumbnail={element.image}
                  />
                </div>
              </DragnDropElement>
            );
          }
        })}
      </div>
      {DraggedElements.map((element) => {
        if (element.name === "Краторная булка N-200i") {
          return (
            <div className="pl-8">
              <ConstructorElement
                type="bottom"
                isLocked={true}
                text={element.name}
                price={element.price}
                thumbnail={element.image}
                
              />
            </div>
          );
        }
      })}
      <div className={`${styles.order__end__container}` + " mt-10 mr-4"}>
        <div className={`${styles.flex__container}` + " mr-4"}>
          <p className="text text_type_digits-medium">610</p>{" "}
          <CurrencyIcon type="primary" />
        </div>
        <div className={styles.flex__container}>
          <Button
            htmlType="button"
            type="primary"
            size="large"
            onClick={handleClickForOpenOrderPopup}
          >
            Оформить заказ
          </Button>
        </div>
      </div>
    </div>
  );
}

BurgerIngredients.propTypes = {
  data: PropTypes.array,
};

import React from "react";
import styles from "./BurgerIngredients.module.css";
import {
  ConstructorElement,
  CurrencyIcon,
  Button,
  DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";

export function BurgerIngredients(props) {
  return (
    <div
      style={{ display: "flex", flexDirection: "column", gap: "10px" }}
      className={`${styles.BurgerIngredients__container}`}
    >
      <div className="pt-25">
        {props.data.map((element) => {
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
        {props.data.map((element) => {
          if (element.type === "main" || element.type === "sauce") {
            return (
              <div className={styles.itemcontainer}>
                <DragIcon type="primary" />
                <ConstructorElement
                  text={element.name}
                  price={element.price}
                  thumbnail={element.image}
                />
              </div>
            );
          }
        })}
      </div>
      {props.data.map((element) => {
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
            onClick={props.handleClickForOpenOrderPopup}
          >
            Оформить заказ
          </Button>
        </div>
      </div>
    </div>
  );
}

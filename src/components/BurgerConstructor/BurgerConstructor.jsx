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
import {
  sortIngredientConstructor,
  deleteItem,
} from "../../services/actions/currentburgeringredients";
import { useNavigate } from "react-router-dom";

export function BurgerConstructor({ onDropHandler, handleOrderButton }) {
  const userLogin = useSelector((store) => store.authentification.isLogin);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  ////////////////////////////////////////////////////////Хуки-селекторы:
  ///Список ингредиентов, перетянутых в конструктор без булок(массив)
  const draggedElements = useSelector(
    (store) => store.currentBurgerIngredients.ingredientsadded
  );
  ///Список ингредиентов, перетянутых в конструктор без булок(объект)
  const draggedElementsAndBuns = useSelector(
    (store) => store.currentBurgerIngredients
  );

  /////Калькулятор цены заказа для отображения
  function calculatePrice() {
    let IngredientsPriceArray = [];
    let total = 0;
    if (draggedElementsAndBuns.bun != null) {
      IngredientsPriceArray = [
        draggedElementsAndBuns.bun.price,
        ...draggedElements.map((item) => item.price),
        draggedElementsAndBuns.bun.price,
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
    const dragIngredient = draggedElements[dragIndex];
    const updateddraggedElements = [...draggedElements];
    updateddraggedElements.splice(dragIndex, 1);
    updateddraggedElements.splice(hoverIndex, 0, dragIngredient);
    dispatch(sortIngredientConstructor(updateddraggedElements));
  };

  //////Обработчик удаления
  function handleItemDelete(element) {
    dispatch(deleteItem(element.unicID));
  }

const handleOrder = () => {
    if (userLogin) {
      handleOrderButton()}
    else {navigate("login")}
  }

  return (
    <section>
      <div
        className={`${styles.BurgerIngredients__container}` + " mt-25"}
        ref={dropRef}
      >
        {draggedElementsAndBuns.bun != null && (
          <div className="pl-8">
            <ConstructorElement
              type="top"
              isLocked={true}
              text={`${draggedElementsAndBuns.bun.name}(верх)`}
              price={draggedElementsAndBuns.bun.price}
              thumbnail={draggedElementsAndBuns.bun.image}
              handleClose={() => handleItemDelete(draggedElementsAndBuns.bun)}
              key={draggedElementsAndBuns.bun.unicID}
            />
          </div>
        )}
        <div className={styles.mainandsauce__container}>
          {draggedElements.map((element, index) => {
            if (element.type === "main" || element.type === "sauce") {
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
                      handleClose={() => handleItemDelete(element)}
                    />
                  </div>
                </DragnDropElement>
              );
            }
          })}
        </div>

        {draggedElementsAndBuns.bun != null && (
          <div className="pl-8">
            <ConstructorElement
              type="bottom"
              isLocked={true}
              text={`${draggedElementsAndBuns.bun.name}(низ)`}
              price={draggedElementsAndBuns.bun.price}
              thumbnail={draggedElementsAndBuns.bun.image}
              handleClose={() => handleItemDelete(draggedElementsAndBuns.bun)}
              key={draggedElementsAndBuns.bun.unicID}
            />
          </div>
        )}

        <div className={`${styles.order__end__container}` + " mt-10 mr-4"}>
          <div className={`${styles.flex__container}` + " mr-4"}>
            <p className="text text_type_digits-medium">{calculatePrice()}</p>
            <CurrencyIcon type="primary" />
          </div>
          <div className={styles.flex__container}>
            {draggedElements.length != 0 && (
              <Button
                htmlType="button"
                type="primary"
                size="large"
                onClick={handleOrder}
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
  onDropHandler: PropTypes.func,
  handleOrderButton: PropTypes.func,
};

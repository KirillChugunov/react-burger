import React, { FunctionComponent } from "react";
import styles from "./homepage.module.css";
import { BurgerIngredients } from "../../components/BurgerIngredients/BurgerIngredients";
import { BurgerConstructor } from "../../components/BurgerConstructor/BurgerConstructor";
import { Modal } from "../../components/Modal/modal";
import { OrderDetails } from "../../components/OrderDetails/OrderDetails";
import { addItem } from "../../services/actions/currentburgeringredients";
import { DELETE_CURRENT_INGREDIENT } from "../../services/actions/currentingredient";
import { getIDsArray, sentOrder } from "../../services/actions/order";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { v4 as uuidv4 } from "uuid";
import { useModal } from "../../hooks/useModal";
import { Outlet } from "react-router-dom";
import { ArrayObj, TingredientAndUnicID } from "../../services/types/types";
import { useDispatch } from "../../hooks/customDispatch";
import { useSelector } from "../../hooks/customUseSelector";

export const HomePage: FunctionComponent = () => {
  const dispatch = useDispatch();
  /////////////////////////////////////////////////////////////Стейты:
  ///Берем кастомный хук
  const {
    closeModal: closeOrderrModal,
    isModalOpen: isOrderModalOpened,
    openModal: openOrderModal,
  } = useModal();

  const draggedElements = useSelector(
    (store) => store.currentBurgerIngredients.ingredientsadded
  );
  ///Список ингредиентов, перетянутых в конструктор без булок(объект)
  const draggedElementsAndBuns = useSelector(
    (store) => store.currentBurgerIngredients
  );

  ////////////////Обработчик кнопки заказа
  function handleOrderButton() {
    let idsForOrder: Array<String> = [];
    if (draggedElementsAndBuns.bun != null) {
      idsForOrder = [
        draggedElementsAndBuns.bun._id,
        ...draggedElements.map((item: TingredientAndUnicID) => item._id),
        draggedElementsAndBuns.bun._id,
      ];
    }
    console.log(idsForOrder);
    dispatch(getIDsArray(idsForOrder));
    const newObj: ArrayObj = {};
    newObj.ingredients = idsForOrder;
    console.log(newObj.ingredients);
    dispatch(sentOrder(newObj));
    openOrderModal();
  }

  /////Обработчик дропа в конструктор (добавляет уникальный айди и диспатчит его в массив)
  const handleDrop = (itemId: TingredientAndUnicID) => {
    itemId.unicID = uuidv4();
    dispatch(addItem(itemId));
  };

  ////////Закрытие попапа
  const closePopup = () => {
    closeOrderrModal();
    dispatch({
      type: DELETE_CURRENT_INGREDIENT,
      item: "",
    });
  };

  ////////Рендер приложения

  return (
    <div className={styles.page}>
      <Outlet />
      <DndProvider backend={HTML5Backend}>
        <main className={styles.main}>
          <BurgerIngredients />
          <BurgerConstructor
            onDropHandler={handleDrop}
            handleOrderButton={handleOrderButton}
          />
        </main>
      </DndProvider>
      {isOrderModalOpened ? (
        <Modal isOrderModalOpened={isOrderModalOpened} closePopup={closePopup}>
          {isOrderModalOpened === true && <OrderDetails />}
        </Modal>
      ) : null}
    </div>
  );
};

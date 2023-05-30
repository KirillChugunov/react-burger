import React, { FunctionComponent } from "react";
import styles from "./homepage.module.css";
import { BurgerIngredients } from "../../components/BurgerIngredients/BurgerIngredients";
import { BurgerConstructor } from "../../components/BurgerConstructor/BurgerConstructor";
import { Modal } from "../../components/Modal/modal";
import { OrderDetails } from "../../components/OrderDetails/OrderDetails";
import { useDispatch, useSelector } from "react-redux";
import { addItem } from "../../services/actions/currentburgeringredients";
import {
  addCurrentIngredient,
  DELETE_CURRENT_INGREDIENT,
} from "../../services/actions/currentingredient.jsx";
import { getIDsArray, sentOrder } from "../../services/actions/order";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { v4 as uuidv4 } from "uuid";
import { getFeed } from "../../services/actions/ingredientList";
import { useModal } from "../../hooks/useModal";
import { Outlet } from "react-router-dom";
import { TTextString, TingredientAndUnicID } from "../../services/types/types";

export const HomePage:FunctionComponent = () => {
  const dispatch:any = useDispatch();
  /////////////////////////////////////////////////////////////Стейты:
  ///Берем кастомный хук
  const {
    closeModal: closeIngrModal,
    isModalOpen: isIngrModalOpened,
    openModal: openIngrModal,
  } = useModal();
  const {
    closeModal: closeOrderrModal,
    isModalOpen: isOrderModalOpened,
    openModal: openOrderModal,
  } = useModal();

  const draggedElements = useSelector(
    (store:any) => store.currentBurgerIngredients.ingredientsadded
  );
  ///Список ингредиентов, перетянутых в конструктор без булок(объект)
  const draggedElementsAndBuns = useSelector(
    (store:any) => store.currentBurgerIngredients
  );

  ////////////////Обработчик кнопки заказа
  function handleOrderButton() {
    const idsForOrder = [
      draggedElementsAndBuns.bun._id,
      ...draggedElements.map((item:TingredientAndUnicID) => item._id),
      draggedElementsAndBuns.bun._id,
    ];
    dispatch(getIDsArray(idsForOrder));
    const newObj:any = {};
    newObj.ingredients = idsForOrder;
    dispatch(sentOrder(newObj));
    openOrderModal();
  }

  /////Обработчик дропа в конструктор (добавляет уникальный айди и диспатчит его в массив)
  const handleDrop = (itemId:TingredientAndUnicID) => {
    itemId.unicID = uuidv4();
    dispatch(addItem(itemId));
  };

  React.useEffect(() => {
    dispatch(getFeed());
  }, []);




  ////////Закрытие попапа
  const closePopup = () => {
    closeIngrModal();
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
          <BurgerIngredients         
          />
          <BurgerConstructor           
            onDropHandler={handleDrop}
            handleOrderButton={handleOrderButton}
          />
        </main>
      </DndProvider>
      {isOrderModalOpened ? (
        <Modal closePopup={closePopup}>
          {isOrderModalOpened === true && <OrderDetails />}
        </Modal>
      ) : null}
    </div>
  );
}

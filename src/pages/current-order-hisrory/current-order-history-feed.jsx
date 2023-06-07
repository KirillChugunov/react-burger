import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./currrent-order-history-feed.module.css";
import { CurrentOrderCard } from "../../components/CurrentOrderCard/CurrentOrderCard";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getfeeeeeeeeeeeed } from "../../services/middleware/wsmiddlewareActions";
import { useEffect } from "react";
import { getfeeeeeeeeeeeedAuth } from "../../services/middleware-auth/wsmiddlewareActions-auth";

export const CurrentOrderHistoryFeed = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getfeeeeeeeeeeeedAuth());
  }, []);

  const { id } = useParams(); // взяли айдишник из ссылки
  const Orders = useSelector((store) => store?.wsReducerAuth?.messages.orders); /// нашли массив заказов
  console.log(Orders);

  const Order = Orders?.find((item) => item._id === id); /// нашли наш заказ
  const ingredientsStorage = useSelector(
    (store) => store?.ingredientList?.feed
  ); /// нашли массив ингридиентов
  const orderIngredientsArr = Order?.ingredients?.map((element) =>
    ingredientsStorage?.find((item) => item._id === element)
  ); /// вытащили из массива ингредиентов элементы, соответствующие текстовым айдишникам в заказе и создали из них новый массив

  const unicIngredients = orderIngredientsArr?.filter(function (x, i, a) {
    return a.indexOf(x) === i;
  }); //// новый массив для рендера из уникальныъ элементов

  const unicIngredientsWithCount = unicIngredients?.map((element) => ({
    ...element,
    count: orderIngredientsArr?.filter((item) => item._id === element._id)
      .length,
  })); /// добавили к объектам массива уникальных элементов новое свойство для отрисовки количества и расчета стоимости

  const orderPrice = orderIngredientsArr
    ?.map((item) => item.price)
    .reduce((partialSum, a) => partialSum + a, 0);

  return (
    <div className={styles.current_order_feed_container}>
      <p
        className={
          `${styles.order_number_container}` + " text text_type_digits-default"
        }
      >
        {Order?.number}
      </p>
      <p className="text text_type_main-medium mt-10">{Order?.name}</p>
      <p
        className={
          `${styles.done_textcolor}` + " text text_type_main-default mt-3"
        }
      >
        {Order?.status}
      </p>
      <p className="text text_type_main-medium mt-15">Состав:</p>
      <div className={`${styles.cards_container}` + " mt-6"}>
        {unicIngredientsWithCount?.map((ingredient) => (
          <CurrentOrderCard ingredient={ingredient} />
        ))}
      </div>
      <div className={`${styles.total_container}` + " mt-10"}>
        <p className="text text_type_main-default text_color_inactive">
          {Order?.createdAt}
        </p>
        <div className={styles.price_container}>
          <p className="text text_type_digits-default">{orderPrice}</p>
          <CurrencyIcon type="primary" />
        </div>
      </div>
    </div>
  );
};

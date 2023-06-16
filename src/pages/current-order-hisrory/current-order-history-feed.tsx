import {
  CurrencyIcon,
  FormattedDate,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./currrent-order-history-feed.module.css";
import { CurrentOrderCard } from "../../components/CurrentOrderCard/CurrentOrderCard";
import { useParams } from "react-router-dom";
import { getOrdersFeed, stopOrdersFeed } from "../../services/middleware/wsmiddlewareActions";
import { useEffect } from "react";
import { useDispatch } from "../../hooks/customDispatch";
import { FunctionComponent } from "react";
import { useSelector } from "../../hooks/customUseSelector";
import { TOrder, Tingredient, TingredientAndUnicID } from "../../services/types/types";
import { TingredientAndCount } from "../../services/types/types";
import { wsUrl } from "../../services/Api/api";
import { ignoreUndefined } from "../../hooks/ignoreundefined";
import { v4 as uuidv4 } from "uuid";
import { getCookie } from "../../services/Coockie/getCookie";

export const CurrentOrderHistoryFeed: FunctionComponent = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getOrdersFeed(`${wsUrl.auth}${getCookie("accessToken")?.replace("Bearer ", "")}`))
    return function cleanup() {
      dispatch(stopOrdersFeed())
    }
  }, []);

  const { id } = useParams(); // взяли айдишник из ссылки
  const Orders = useSelector((store) => store.wsReducer?.messages.orders); /// нашли массив заказов
  const Order:TOrder = Orders?.find((item: TOrder) => item._id === id); /// нашли наш заказ
  const ingredientsStorage = useSelector(
    (store) => store?.ingredientList?.feed
  ); /// нашли массив ингридиентов
  const orderIngredients:Array<TingredientAndUnicID | undefined> = Order?.ingredients?.map((element: string) =>
    ingredientsStorage?.find((item) => item._id === element)
  ); /// вытащили из массива ингредиентов элементы, соответствующие текстовым айдишникам в заказе и создали из них новый массив

  const orderIngredientsArr: Array<TingredientAndUnicID> = orderIngredients.map(
    (element) => ignoreUndefined(element)
  );


  const unicIngredients = orderIngredientsArr?.filter(function (
    x: any,
    i: any,
    a: any
  ) {
    return a.indexOf(x) === i;
  }); //// новый массив для рендера из уникальныъ элементов

  const unicIngredientsWithCount:Array<TingredientAndCount>= unicIngredients?.map(
    (element) => ({
      ...element,
      count: orderIngredientsArr?.filter(
        (item: Tingredient) => item._id === element._id
      ).length,
    })
  ); /// добавили к объектам массива уникальных элементов новое свойство для отрисовки количества и расчета стоимости

  const orderPrice = orderIngredientsArr
    ?.map((item: Tingredient) => item.price)
    .reduce((partialSum: number, a: number) => partialSum + a, 0);

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
      {Order?.status === "done" && (
        <p
          className={
            `${styles.done_textcolor}` + " text text_type_main-default mt-3"
          }
        >
          Готов
        </p>
      )}
      {Order?.status === "pending" && (
        <p
          className={
            `${styles.done_textcolor}` + " text text_type_main-default mt-3"
          }
        >
          Готовиться
        </p>
      )}
      {Order?.status === "created" && (
        <p
          className={
            `${styles.done_textcolor}` + " text text_type_main-default mt-3"
          }
        >
          Создан
        </p>
      )}
      <p className="text text_type_main-medium mt-15">Состав:</p>
      <div className={`${styles.cards_container}` + " mt-6"}>
        {unicIngredientsWithCount?.map((ingredient) => (
          <CurrentOrderCard key={uuidv4()} ingredient={ingredient} />
        ))}
      </div>
      <div className={`${styles.total_container}` + " mt-10"}>
        <FormattedDate
          className="text text_type_main-default text_color_inactive"
          date={new Date(Order?.createdAt)}
        />
        <div className={styles.price_container}>
          <p className="text text_type_digits-default">{orderPrice}</p>
          <CurrencyIcon type="primary" />
        </div>
      </div>
    </div>
  );
};

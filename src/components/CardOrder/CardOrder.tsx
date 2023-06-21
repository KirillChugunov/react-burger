import {
  CurrencyIcon,
  FormattedDate,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./CardOrder.module.css";
import { useSelector } from "../../hooks/customUseSelector";
import { FunctionComponent } from "react";
import { TOrder, TingredientAndUnicID } from "../../services/types/types";
import { ignoreUndefined } from "../../hooks/ignoreundefined";
import { v4 as uuidv4 } from "uuid";

interface ICardOrderProps {
  order: TOrder;
}

export const CardOrder: FunctionComponent<ICardOrderProps> = ({ order }) => {
  const ingredientsStorage = useSelector((store) => store.ingredientList.feed);
  const orderIngredientsArr: Array<TingredientAndUnicID | undefined> =
    order.ingredients
      ?.map((element: string) =>
        ingredientsStorage.find(
          (item: TingredientAndUnicID) => item._id === element
        )
      )
      .filter(Boolean);

  const orderIngredientsArrCheked: Array<TingredientAndUnicID> =
    orderIngredientsArr.map((element) => ignoreUndefined(element));

  const orderPrice = orderIngredientsArrCheked
    ?.map((element: TingredientAndUnicID) => element.price)
    .reduce((partialSum: number, a: number) => partialSum + a, 0);

  const orderIngredientsArrChekedandUnidIC: Array<TingredientAndUnicID> =
    orderIngredientsArrCheked.map((element) => ({
      ...element,
      unicID: uuidv4(),
    }));

  return (
    <div className={styles.cardorder_container}>
      <div className={`${styles.number_date_container}` + " mt-6 ml-6 mr-6"}>
        <p className="text text_type_digits-default">{order.number}</p>
        <p className="text text_type_main-default text_color_inactive">
          <FormattedDate
            className="text text_type_main-default text_color_inactive"
            date={new Date(order.createdAt)}
          />
        </p>
      </div>
      <div className="mt-6 ml-6 mr-6">
        <p className="text text_type_main-medium">{order.name}</p>
        {order.status === "done" && <p>Готов</p>}
        {order.status === "pending" && <p>Готовиться</p>}
        {order.status === "created" && <p>Создан</p>}
      </div>
      <div
        className={`${styles.icons_price_container}` + " mt-6 ml-6 mr-6 mb-6"}
      >
        <div className={styles.price_container}>
          <div className={styles.img_array_container}>
            {orderIngredientsArrChekedandUnidIC
              ?.slice(0, 5)
              .map((element: TingredientAndUnicID) => (
                <div
                  key={element.unicID}
                  className={`${styles.img_overlay} ${styles.img}`}
                >
                  <img
                    className={styles.img}
                    src={element.image}
                    alt={`изображение ${element.name}`}
                  />
                </div>
              ))}
            {orderIngredientsArrChekedandUnidIC &&
              orderIngredientsArrChekedandUnidIC?.slice(
                5,
                orderIngredientsArrChekedandUnidIC?.length
              )?.length > 0 && (
                <div className={styles.rest_orders_container}>
                  <div className={styles.text_box}>
                    <p className={styles.text_opacity}>
                      {"+" +
                        orderIngredientsArrChekedandUnidIC?.slice(
                          5,
                          orderIngredientsArrChekedandUnidIC.length
                        ).length}
                    </p>
                  </div>
                  <div className={`${styles.img_overlay} ${styles.img}`}>
                    <img
                      alt={`изображение ${orderIngredientsArrChekedandUnidIC[5].name}`}
                      className={styles.img_opacity}
                      src={orderIngredientsArrChekedandUnidIC[5]?.image}
                    />
                  </div>
                </div>
              )}
          </div>
          <div className={styles.price_and_icon_container}>
            <p className="text text_type_digits-default">{orderPrice}</p>
            <CurrencyIcon type="primary" />
          </div>
        </div>
      </div>
    </div>
  );
};

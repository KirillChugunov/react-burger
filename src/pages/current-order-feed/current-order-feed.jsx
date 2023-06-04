import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./currrent-order-feed.module.css";
import { CurrentOrderCard } from "../../components/CurrentOrderCard/CurrentOrderCard";
export const CurrentOrderFeed = () => {
  return (
    <div className={styles.current_order_feed_container}>
      <p
        className={
          `${styles.order_number_container}` + " text text_type_digits-default"
        }
      >
        #034533
      </p>
      <p className="text text_type_main-medium mt-10">
        Black Hole Singularity острый бургер
      </p>
      <p
        className={
          `${styles.done_textcolor}` + " text text_type_main-default mt-3"
        }
      >
        Выполнен
      </p>
      <p className="text text_type_main-medium mt-15">Состав:</p>
      <div className={`${styles.cards_container}` + " mt-6"}>
        <CurrentOrderCard />
        <CurrentOrderCard />
        <CurrentOrderCard />
        <CurrentOrderCard />
        <CurrentOrderCard />
        <CurrentOrderCard />
        <CurrentOrderCard />
        <CurrentOrderCard />
        <CurrentOrderCard />
      </div>
      <div className={`${styles.total_container}` + " mt-10"}>
        <p className="text text_type_main-default text_color_inactive">
          Вчера, 13:50
        </p>
        <div className={styles.price_container}>
          <p className="text text_type_digits-default">510</p>
          <CurrencyIcon type="primary" />
        </div>
      </div>
    </div>
  );
};

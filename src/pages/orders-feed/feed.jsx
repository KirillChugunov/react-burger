import { useEffect } from "react";
import { CardOrder } from "../../components/CardOrder/CardOrder";
import { OdersStats } from "../../components/OrdersStats/OrdersStats";
import styles from "./feed.module.css";
import { useDispatch, useSelector } from "react-redux";
import { getfeeeeeeeeeeeed } from "../../services/middleware/wsmiddlewareActions";

export const OrdersFeed = () => {
  const feed = useSelector((store) => store.wsReducer);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getfeeeeeeeeeeeed());
  }, []);


  return (
    <section>
      <p className="text text_type_main-large mb-5 mt-10">Лента заказов</p>
      <div className={styles.feed_container}>
        <div className={styles.orders_scroll_container}>
          {feed.messages.orders?.map((order) => (
            <CardOrder order={order} />
          ))}
        </div>
        <div>
          <OdersStats />
        </div>
      </div>
    </section>
  );
};

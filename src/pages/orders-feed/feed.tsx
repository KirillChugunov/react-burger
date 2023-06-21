import { useEffect } from "react";
import { CardOrder } from "../../components/CardOrder/CardOrder";
import { OdersStats } from "../../components/OrdersStats/OrdersStats";
import styles from "./feed.module.css";
import {
  getOrdersFeed,
  stopOrdersFeed,
} from "../../services/middleware/wsmiddlewareActions";
import { Link, useLocation } from "react-router-dom";
import { useDispatch } from "../../hooks/customDispatch";
import  { FunctionComponent } from "react";
import { useSelector } from "../../hooks/customUseSelector";
import { TOrder } from "../../services/types/types";
import { wsUrl } from "../../services/Api/api";

export const OrdersFeed: FunctionComponent = () => {
  const location = useLocation();
  const feed = useSelector((store) => store.wsReducer);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getOrdersFeed(wsUrl.all));
    return function cleanup() {
      dispatch(stopOrdersFeed());
    };
  }, []);

  return (
    <section>
      <p className="text text_type_main-large mb-5 mt-10">Лента заказов</p>
      <div className={styles.feed_container}>
        <div className={styles.orders_scroll_container}>
          {feed.messages.orders?.map((order: TOrder) => (
            <Link
              key={order._id}
              state={{ background: location }}
              className={styles.link}
              to={`/feed/${order._id}`}
            >
              <CardOrder order={order} />
            </Link>
          ))}
        </div>
        <div>
          <OdersStats />
        </div>
      </div>
    </section>
  );
};

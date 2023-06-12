import { CardOrder } from "../CardOrder/CardOrder";
import styles from "./OrdersHistoryFeed.module.css";
import { useEffect, FunctionComponent } from "react";
import { Link, useLocation } from "react-router-dom";
import { useDispatch } from "../../hooks/customDispatch";
import { useSelector } from "../../hooks/customUseSelector";
import { TOrder } from "../../services/types/types";
import { wsUrl } from "../../services/Api/api";
import { getCookie } from "../../services/Coockie/getCookie";
import { getOrdersFeed } from "../../services/middleware/wsmiddlewareActions";

export const OrdersHistoryFeed: FunctionComponent = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const orderFeed = useSelector((store) => store.wsReducer.messages?.orders);

  useEffect(() => {
    dispatch(getOrdersFeed(wsUrl.auth));
  }, []);

  return (
    <div className={`${styles.orders_scroll_container}` + " mt-10"}>
      {orderFeed?.map((order: TOrder) => (
        <Link
          state={{ background: location }}
          className={styles.link}
          to={`/profile/orders/${order._id}`}
        >
          <CardOrder order={order} />
        </Link>
      ))}
    </div>
  );
};

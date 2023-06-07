import { useDispatch, useSelector } from "react-redux";
import { getfeeeeeeeeeeeedAuth } from "../../services/middleware-auth/wsmiddlewareActions-auth";
import { CardOrder } from "../CardOrder/CardOrder";
import styles from "./OrdersHistoryFeed.module.css";
import { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

export const OrdersHistoryFeed = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const orderFeed = useSelector(
    (store) => store.wsReducerAuth.messages?.orders
  );

  useEffect(() => {
    dispatch(getfeeeeeeeeeeeedAuth());
  }, []);

  return (
    <div className={`${styles.orders_scroll_container}` + " mt-10"}>
      {orderFeed?.map((order) => (
        <Link
          order={order}
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

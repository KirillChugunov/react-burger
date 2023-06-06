import { useDispatch, useSelector } from "react-redux";
import { getfeeeeeeeeeeeedAuth } from "../../services/middleware-auth/wsmiddlewareActions-auth";
import { CardOrder } from "../CardOrder/CardOrder";
import styles from "./OrdersHistoryFeed.module.css";
import { useEffect } from "react";

export const OrdersHistoryFeed = () => {
  const dispatch = useDispatch();
  const orderFeed = useSelector((store) => store.wsReducerAuth.messages.orders);

  useEffect(() => {
    dispatch(getfeeeeeeeeeeeedAuth());
  }, []);


 
  return (
    <div className={styles.orders_scroll_container}>
      {orderFeed?.map((order) => (
            <CardOrder order={order} status={order.status} />
          ))}
    </div>
  );
};

import { CardOrder } from "../CardOrder/CardOrder";
import styles from "./OrdersHistoryFeed.module.css";
import { useEffect, FunctionComponent } from "react";
import { Link, useLocation } from "react-router-dom";
import { useDispatch } from "../../hooks/customDispatch";
import { useSelector } from "../../hooks/customUseSelector";
import { TOrder } from "../../services/types/types";
import { wsUrl } from "../../services/Api/api";
import { getOrdersFeed, stopOrdersFeed } from "../../services/middleware/wsmiddlewareActions";
import { getCookie } from "../../services/Coockie/getCookie";

export const OrdersHistoryFeed: FunctionComponent = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const orderFeed = useSelector((store) => store.wsReducer.messages?.orders);

  useEffect(() => {
    dispatch(getOrdersFeed(`${wsUrl.auth}${getCookie("accessToken")?.replace("Bearer ", "")}`))
    // return () =>  {dispatch(stopOrdersFeed())}
  }, []);

  console.log(`${wsUrl.auth}+${getCookie("accessToken")?.replace("Bearer ", "")}`)

  return (
    <div className={`${styles.orders_scroll_container}` + " mt-10"}>
      {orderFeed?.map((order: TOrder) => (
        <Link key={order._id}
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

import { useEffect } from "react";
import { CardOrder } from "../../components/CardOrder/CardOrder";
import { OdersStats } from "../../components/OrdersStats/OrdersStats";
import styles from "./feed.module.css";
import { getOrdersFeed } from "../../services/middleware/wsmiddlewareActions";
import { Link, Outlet, useLocation } from "react-router-dom";
import { Preloader } from "../../components/Preloader/preloader";
import { useDispatch } from "../../hooks/customDispatch";
import React, { FunctionComponent } from "react";
import { useSelector } from "../../hooks/customUseSelector";
import { TOrder } from "../../services/types/types";

export const OrdersFeed: FunctionComponent = () => {
  const location = useLocation();
  const feed = useSelector((store) => store.wsReducer);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getOrdersFeed());
  }, []);

  return feed.messages.orders ? (
    <section>
      <p className="text text_type_main-large mb-5 mt-10">Лента заказов</p>
      <div className={styles.feed_container}>
        <div className={styles.orders_scroll_container}>
          {feed.messages.orders?.map((order: TOrder) => (
            <Link
              state={{ background: location }}
              className={styles.link}
              to={`/feed/${order._id}`}
            >
              <CardOrder order={order} />
            </Link>
          ))}
        </div>
        <Outlet />
        <div>
          <OdersStats />
        </div>
      </div>
    </section>
  ) : (
    <Preloader />
  );
};

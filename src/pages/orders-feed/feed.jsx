import { useEffect } from "react";
import { CardOrder } from "../../components/CardOrder/CardOrder";
import { OdersStats } from "../../components/OrdersStats/OrdersStats";
import styles from "./feed.module.css";
import { useDispatch, useSelector } from "react-redux";
import { getfeeeeeeeeeeeed } from "../../services/middleware/wsmiddlewareActions";
import { Link, Outlet, useLocation } from "react-router-dom";
import { Preloader } from "../../components/Preloader/preloader";

export const OrdersFeed = () => {
  const location = useLocation();
  const feed = useSelector((store) => store.wsReducer);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getfeeeeeeeeeeeed());
  }, []);

  return feed.messages.orders ? (
    <section>
      <p className="text text_type_main-large mb-5 mt-10">Лента заказов</p>
      <div className={styles.feed_container}>
        <div className={styles.orders_scroll_container}>
          {feed.messages.orders?.map((order) => (
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

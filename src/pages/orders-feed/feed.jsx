import { useEffect } from "react";
import { CardOrder } from "../../components/CardOrder/CardOrder";
import { OdersStats } from "../../components/OrdersStats/OrdersStats";
import styles from "./feed.module.css";
import { useDispatch, useSelector } from "react-redux";
import { getfeeeeeeeeeeeed } from "../../services/middleware/wsmiddlewareActions";


export const OrdersFeed = () => {
  const dispatch = useDispatch()
  useEffect(() => {
     dispatch(getfeeeeeeeeeeeed())
  }, []);

  const feed = useSelector((store) => store.wsReducer);
  const connected = useSelector((store) => store.wsReducer.wsConnected);
  
  // function answerToJson(feed) {
  // if (connected === true) {
  // return JSON.parse(feed.messages[0])}
  // }

  // answerToJson(feed)

  return (
    <section>
    <p className="text text_type_main-large mb-5 mt-10">
    Лента заказов
    </p>
    <div className={styles.feed_container}>
  <div className={styles.orders_scroll_container}>
<CardOrder />
<CardOrder />
<CardOrder />
<CardOrder />
<CardOrder />
<CardOrder />
</div>
<div><OdersStats /></div>
    </div>
    </section>
  )
}
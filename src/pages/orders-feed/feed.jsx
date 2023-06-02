import { CardOrder } from "../../components/CardOrder/CardOrder";
import { OdersStats } from "../../components/OrdersStats/OrdersStats";
import styles from "./feed.module.css";


export const OrdersFeed = () => {
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
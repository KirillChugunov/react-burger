import { CardOrder } from "../CardOrder/CardOrder"
import styles from "./OrdersHistoryFeed.module.css"

export const OrdersHistoryFeed = () => {
  return (<div className={styles.orders_scroll_container}>
    <CardOrder />
<CardOrder />
<CardOrder />
<CardOrder />
<CardOrder />
<CardOrder />
  </div>)
}
import { useSelector } from "../../hooks/customUseSelector";
import { TOrder } from "../../services/types/types";
import styles from "./OrdersStats.module.css";

export const OdersStats = (): JSX.Element | null => {
  const feed = useSelector((store) => store.wsReducer);
  const doneOrders:Array<TOrder> = feed.messages.orders?.filter(
    (item: TOrder) => item.status === "done"
  );
  const inProgressOrders:Array<TOrder> = feed.messages.orders?.filter(
    (item: TOrder) => item.status === "pending"
  );
  return (
    feed.messages.orders && (
      <div className={styles.orders_stats_container}>
        <div className={styles.rdy_inwork_container}>
          <div>
            <p className="text text_type_main-large mb-6">Готовы</p>
            <div className={styles.rdy_textcolor_container}>
              {doneOrders.map((order: TOrder) => (
                <p className="text text_type_digits-default mb-2">
                  {order.number}
                </p>
              ))}
            </div>
            <div></div>
          </div>
          <div>
            <p className=" text text_type_main-large mb-6">В работе</p>
            <div>
              {inProgressOrders.map((order: TOrder) => (
                <p className="text text_type_digits-default mb-2">
                  {order.number}
                </p>
              ))}
            </div>
          </div>
        </div>

        <div>
          <p className="text text_type_main-large">Выполнено за все время:</p>
          <p
            className={
              `${styles.box_shadow_text}` + " text text_type_digits-large"
            }
          >
            {feed.messages.total}
          </p>
        </div>
        <div>
          <p className="text text_type_main-large">Выполнено за сегодня:</p>
          <p
            className={
              `${styles.box_shadow_text}` + " text text_type_digits-large"
            }
          >
            {feed.messages.totalToday}
          </p>
        </div>
      </div>
    )
  );
};

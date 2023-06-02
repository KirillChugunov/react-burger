import styles from "./OrdersStats.module.css"

export const OdersStats = () => {
  return (
<div className={styles.orders_stats_container}>
  <div className={styles.rdy_inwork_container}>
  <div>
  <p className="text text_type_main-medium mb-6">
  Готовы
</p>
<div className={styles.rdy_textcolor_container}>
<p className="text text_type_digits-default mb-2">1234567890</p>
<p className="text text_type_digits-default mb-2">1234567890</p>
<p className="text text_type_digits-default mb-2">1234567890</p>
<p className="text text_type_digits-default mb-2">1234567890</p>
</div>
<div></div>
  </div>
  <div>
  <p className=" text text_type_main-large mb-6">
  В работе
</p>
<div>
<p className="text text_type_digits-default mb-2">1234567890</p>
<p className="text text_type_digits-default mb-2">1234567890</p>
<p className="text text_type_digits-default mb-2">1234567890</p>
<p className="text text_type_digits-default mb-2">1234567890</p>
<p className="text text_type_digits-default mb-2">1234567890</p>
</div>
  </div>
  </div>

<div>
<p className= "text text_type_main-large">
  Выполнено за все время:
</p>
<p className={`${styles.box_shadow_text}` + " text text_type_digits-large"}>1234567890</p>
</div>
<div>
<p className="text text_type_main-large">
  Выполнено за сегодня:
</p>
<p className={`${styles.box_shadow_text}` + " text text_type_digits-large"}>1234567890</p>
</div>

</div>

  )
}
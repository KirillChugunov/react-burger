import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components"
import styles from "./CardOrder.module.css"

export const CardOrder = ({order}) => {
  return (
    <div className={styles.cardorder_container}>
      <div className={`${styles.number_date_container}`+ " mt-6 ml-6 mr-6"}>
      <p className="text text_type_digits-default">1234567890</p>
      <p className="text text_type_main-default text_color_inactive">
      дата
</p>
        </div>
      <div className="mt-6 ml-6 mr-6"><p className="text text_type_main-medium">
      Death Star Starship Main бургер
</p></div>
      <div className={`${styles.icons_price_container}`+ " mt-6 ml-6 mr-6 mb-6"}>
        <div className={styles.price_container}>
        <p className="text text_type_digits-default">490</p>
        <CurrencyIcon type="primary" />
        </div>
        
        </div>
      </div>
  )
}
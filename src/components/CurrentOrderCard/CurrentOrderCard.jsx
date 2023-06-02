import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./CurrentOrderCard.module.css";
import img from "./../../images/bun-0111111.png";

export const CurrentOrderCard = () => {
return (
  <div className={`${styles.ingr_container}` + " mr-6"}>
    <div className={styles.img_container}>
  <img className={styles.img} src={img} />
  </div>
  <p className="text text_type_main-default ml-4 mr-4">
  Флюоресцентная булка R2-D3
</p>
<div className={styles.price_container}>
<p className="text text_type_digits-default">2 x 20</p>
<CurrencyIcon type="primary" />
</div>
  </div>
        )
}
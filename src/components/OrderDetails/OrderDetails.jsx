import styles from "./OrderDetails.module.css";
import { CheckMarkIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from 'prop-types';
import { done111 } from "./../../images/order accpeted/popup/done111.png";

export function OrderDetails(props) {
  const logo = require("./../../images/order accpeted/popup/done111.png");
  return (
    <div className={`${styles.orderdetails__container}` + " mt-30 mb-30"}>
      <div className="mb-8">
        <p className="text text_type_digits-large">034536</p>
      </div>

      <div className="mb-15">
        <p className="text text_type_main-medium">идентификатор заказа</p>
      </div>

      <div className={`${styles.img__container}` + " mb-15"}>
        <img src={logo}></img>
      </div>

      <div className="mb-2">
        <p className="text text_type_main-default">Ваш заказ начали готовить</p>
      </div>

      <div className="mb-2">
        <p className="text text_type_main-default">
          Дождитесь готовности на орбитальной станции
        </p>
      </div>
    </div>
  );
}
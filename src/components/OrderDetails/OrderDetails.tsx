import styles from "./OrderDetails.module.css";
import logo from "./../../images/order accpeted/popup/done111.png";
import { FunctionComponent } from "react";
import { Preloader } from "../Preloader/preloader";
import { useSelector } from "../../hooks/customUseSelector";

export const OrderDetails: FunctionComponent = () => {
  const OrderNunber = useSelector((store) => store.order.orderNumber);
  return OrderNunber ? (
    <div className={`${styles.orderdetails__container}` + " mt-30 mb-30"}>
      <div className="mb-8">
        <p className="text text_type_digits-large">{OrderNunber}</p>
      </div>

      <div className="mb-15">
        <p className="text text_type_main-medium">идентификатор заказа</p>
      </div>

      <div className={`${styles.img__container}` + " mb-15"}>
        <img src={logo} alt="изображение логотипа"></img>
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
  ) : (
    <Preloader />
  );
};

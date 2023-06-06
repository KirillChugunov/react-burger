import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./CardOrder.module.css";
import { useSelector } from "react-redux";

export const CardOrder = ({ order, status }) => {
  const ingredientsStorage = useSelector((store) => store.ingredientList.feed);
  const orderIngredientsArr = order.ingredients?.map((element) =>
    ingredientsStorage?.find((item) => item._id === element)
  );

  const orderPrice = orderIngredientsArr.map((item) => item.price).reduce((partialSum, a) => partialSum + a, 0);


  return (
    <div className={styles.cardorder_container}>
      <div className={`${styles.number_date_container}` + " mt-6 ml-6 mr-6"}>
        <p className="text text_type_digits-default">{order.number}</p>
        <p className="text text_type_main-default text_color_inactive">
          {Date(Date.parse(order.createdAt))}
        </p>
      </div>
      <div className="mt-6 ml-6 mr-6">
        <p className="text text_type_main-medium">{order.name}</p>
        {status && <p>{status}</p>}
        
      </div>
      <div className={`${styles.icons_price_container}` + " mt-6 ml-6 mr-6 mb-6"}
      >
        <div className={styles.price_container}>
          <div className={styles.img_array_container}>
          {orderIngredientsArr.slice(0,5).map((element) => (
         
            <div  className={`${styles.img_overlay} ${styles.img}`} >
               <img className={styles.img} src={element.image} />
            </div>          ))}
            {orderIngredientsArr.slice(5,orderIngredientsArr.length).length > 0 && 
            
            <div  className={`${styles.img_overlay} ${styles.img}`} >
              <div>
              <img className={styles.img_opacity} src={orderIngredientsArr[5].image} />
              <p className={styles.text_opacity}>{"+" + orderIngredientsArr.slice(5,orderIngredientsArr.length).length}</p>
              </div>
            </div>    
}
            
          </div>
          <div className={styles.price_and_icon_container}>
            <p className="text text_type_digits-default">{orderPrice}</p>
            <CurrencyIcon type="primary" />
          </div>
        </div>
      </div>
    </div>
  );
};

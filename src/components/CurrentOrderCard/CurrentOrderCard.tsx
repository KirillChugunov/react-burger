import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./CurrentOrderCard.module.css";
import { TingredientAndCount } from "../../services/types/types";
import { FunctionComponent } from "react";

interface ICurrentOrderCardProps {
  ingredient: TingredientAndCount;
}

export const CurrentOrderCard: FunctionComponent<ICurrentOrderCardProps> = ({
  ingredient,
}) => {
  return (
    <div className={`${styles.ingr_container}` + " mr-6"}>
      <div className={styles.img_container}>
        <img
          className={styles.img}
          src={ingredient.image}
          alt={`изображение ${ingredient.name}`}
        />
      </div>
      <p className="text text_type_main-default ml-4 mr-4">{ingredient.name}</p>
      <div className={styles.price_container}>
        <p className="text text_type_digits-default">
          {ingredient.count} x {ingredient.price}
        </p>
        <CurrencyIcon type="primary" />
      </div>
    </div>
  );
};

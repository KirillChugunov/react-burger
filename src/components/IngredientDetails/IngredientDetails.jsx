import styles from "./IngredientDetails.module.css";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";

export function IngredientDetails(props) {
  const info = useSelector((store) => store.currentIngredient.state);
  if (info) {
    return (
      <div className={styles.ingredientDetails__container}>
        <div className={"ml-4 mr-4 mb-4"}>
          <img
            className={styles.img__container}
            src={info.image}
            alt={`изображение ${info.name}`}
          ></img>
        </div>
        <div className="ml-4 mr-4 mb-4">
          <p className="text text_type_main-medium">{info.name}</p>
        </div>
        <div className={styles.composition__container}>
          <div
            className={
              `${styles.item_composition__container}` + " ml-5 mr-5 mb-5 mt-5"
            }
          >
            <p className="text text_type_main-default">Калории,ккал</p>
            <p className="text text_type_main-medium">{info.calories}</p>
          </div>
          <div
            className={
              `${styles.item_composition__container}` + " ml-5 mr-5 mb-5 mt-5"
            }
          >
            <p className="text text_type_main-default">Белки, г</p>
            <p className="text text_type_main-medium">{info.proteins}</p>
          </div>

          <div
            className={
              `${styles.item_composition__container}` + " ml-5 mr-5 mb-5 mt-5"
            }
          >
            <p className="text text_type_main-default">Жиры, г</p>
            <p className="text text_type_main-medium">{info.fat}</p>
          </div>

          <div
            className={
              `${styles.item_composition__container}` + " ml-5 mr-5 mb-5 mt-5"
            }
          >
            <p className="text text_type_main-default">Углеводы, г</p>
            <p className="text text_type_main-medium">{info.carbohydrates}</p>
          </div>
        </div>
      </div>
    );
  }
}

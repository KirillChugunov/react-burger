import styles from "./IngredientDetails.module.css";
import { FunctionComponent} from "react";
import { useSelector } from "react-redux";

  export const IngredientDetails:FunctionComponent = () => {
  const info = useSelector((store:any) => store.currentIngredient.state);
    return (
      info && <div className={styles.ingredientDetails__container}>
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


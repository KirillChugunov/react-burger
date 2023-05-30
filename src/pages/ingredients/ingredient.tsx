import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import styles from "./IngredientDetails.module.css";
import { FunctionComponent } from "react";
import { TingredientAndUnicID } from "../../services/types/types";

export const IngredientsPage = () => {
  const { id } = useParams();
  const Ingredients = useSelector((store:any) => store.ingredientList.feed);
  const Ingredient = Ingredients.find((item:TingredientAndUnicID) => item._id === id);
  if (id && Ingredient) {
    return (
      <div className={styles.ingredientDetails__container}>
        <div className={"ml-4 mr-4 mb-4"}>
          <img
            className={styles.img__container}
            src={Ingredient.image}
            alt={`изображение ${Ingredients.name}`}
          ></img>
        </div>
        <div className="ml-4 mr-4 mb-4">
          <p className="text text_type_main-medium">{Ingredient.name}</p>
        </div>
        <div className={styles.composition__container}>
          <div
            className={
              `${styles.item_composition__container}` + " ml-5 mr-5 mb-5 mt-5"
            }
          >
            <p className="text text_type_main-default">Калории,ккал</p>
            <p className="text text_type_main-medium">{Ingredient.calories}</p>
          </div>
          <div
            className={
              `${styles.item_composition__container}` + " ml-5 mr-5 mb-5 mt-5"
            }
          >
            <p className="text text_type_main-default">Белки, г</p>
            <p className="text text_type_main-medium">{Ingredient.proteins}</p>
          </div>

          <div
            className={
              `${styles.item_composition__container}` + " ml-5 mr-5 mb-5 mt-5"
            }
          >
            <p className="text text_type_main-default">Жиры, г</p>
            <p className="text text_type_main-medium">{Ingredient.fat}</p>
          </div>

          <div
            className={
              `${styles.item_composition__container}` + " ml-5 mr-5 mb-5 mt-5"
            }
          >
            <p className="text text_type_main-default">Углеводы, г</p>
            <p className="text text_type_main-medium">
              {Ingredient.carbohydrates}
            </p>
          </div>
        </div>
      </div>
    ) 
}
}

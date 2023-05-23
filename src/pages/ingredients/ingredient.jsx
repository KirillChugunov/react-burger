import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import styles from "./IngredientDetails.module.css";

export function IngredientsPage() {

  const Ingredients = useSelector((store) => store.ingredientList.feed[1]);
  const {id} = useParams();
  console.log(id)
  console.log(Ingredients)

  if (Ingredients) {return (
     <div className={styles.ingredientDetails__container}>
      <p>{id}</p>
      <div className={"ml-4 mr-4 mb-4"}>
        <img
          className={styles.img__container}
          src={Ingredients.image}
          alt={`изображение ${Ingredients.name}`}
        ></img>
      </div>
      <div className="ml-4 mr-4 mb-4">
        <p className="text text_type_main-medium">{Ingredients.name}</p>
      </div>
      <div className={styles.composition__container}>
        <div
          className={
            `${styles.item_composition__container}` + " ml-5 mr-5 mb-5 mt-5"
          }
        >
          <p className="text text_type_main-default">Калории,ккал</p>
          <p className="text text_type_main-medium">{Ingredients.calories}</p>
        </div>
        <div
          className={
            `${styles.item_composition__container}` + " ml-5 mr-5 mb-5 mt-5"
          }
        >
          <p className="text text_type_main-default">Белки, г</p>
          <p className="text text_type_main-medium">{Ingredients.proteins}</p>
        </div>

        <div
          className={
            `${styles.item_composition__container}` + " ml-5 mr-5 mb-5 mt-5"
          }
        >
          <p className="text text_type_main-default">Жиры, г</p>
          <p className="text text_type_main-medium">{Ingredients.fat}</p>
        </div>

        <div
          className={
            `${styles.item_composition__container}` + " ml-5 mr-5 mb-5 mt-5"
          }
        >
          <p className="text text_type_main-default">Углеводы, г</p>
          <p className="text text_type_main-medium">{Ingredients.carbohydrates}</p>
        </div>
      </div>
    </div>
  )} 
}

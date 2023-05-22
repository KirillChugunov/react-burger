import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import styles from "./IngredientDetails.module.css";

export function IngredientsPage() {

  const Ingredients = useSelector((store) => store.ingredientList.feed);
  const ingredientID = useParams().id

  return (<><p>11111</p>
    <div className={styles.ingredientDetails__container}>
    {Ingredients.map(info => (<Link key={info.id} to={`/ingredients/${info.id}`}>
      <img
        className={styles.img__container}
        src={info.image}
        alt={`изображение ${info.name}`}
      ></img>
      </Link>))}
  </div>
  </>

  )

}

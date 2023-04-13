import styles from "./IngredientDetails.module.css";

export function IngredientDetails(props) {
  return (
    <div className={styles.ingredientDetails__container}>
      <div className={"ml-4 mr-4 mb-4"}>
        <img
          className={styles.img__container}
          src={props.elementData.image}
        ></img>
      </div>
      <div className="ml-4 mr-4 mb-4">
        <p className="text text_type_main-medium">{props.elementData.name}</p>
      </div>
      <div className={styles.composition__container}>
        <div
          className={
            `${styles.item_composition__container}` + " ml-5 mr-5 mb-5 mt-5"
          }
        >
          <p className="text text_type_main-default">Калории,ккал</p>
          <p className="text text_type_main-medium">
            {props.elementData.calories}
          </p>
        </div>
        <div
          className={
            `${styles.item_composition__container}` + " ml-5 mr-5 mb-5 mt-5"
          }
        >
          <p className="text text_type_main-default">Белки, г</p>
          <p className="text text_type_main-medium">
            {props.elementData.proteins}
          </p>
        </div>

        <div
          className={
            `${styles.item_composition__container}` + " ml-5 mr-5 mb-5 mt-5"
          }
        >
          <p className="text text_type_main-default">Жиры, г</p>
          <p className="text text_type_main-medium">{props.elementData.fat}</p>
        </div>

        <div
          className={
            `${styles.item_composition__container}` + " ml-5 mr-5 mb-5 mt-5"
          }
        >
          <p className="text text_type_main-default">Углеводы, г</p>
          <p className="text text_type_main-medium">
            {props.elementData.carbohydrates}
          </p>
        </div>
      </div>
    </div>
  );
}

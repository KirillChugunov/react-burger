export const ADD_INGREDIENT: "ADD_INGREDIENT" = "ADD_INGREDIENT";
export const DELETE_INGREDIENT: "DELETE_INGREDIENT" = "DELETE_INGREDIENT";
export const SORT_ITEMS: "SORT_ITEMS" = "SORT_ITEMS";
export const RESET_INGREDIENT: "RESET_INGREDIENT" = "RESET_INGREDIENT";

export const sortIngredientConstructor = (indredients: Array<Object>) => ({
  type: SORT_ITEMS,
  indredients: indredients,
});

export const addItem = (ingredient: Object) => ({
  type: ADD_INGREDIENT,
  ingredientsadded: ingredient,
});

export const deleteItem = (unicID: Object) => ({
  type: DELETE_INGREDIENT,
  unicID: unicID,
});

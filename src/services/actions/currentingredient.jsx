export const ADD_CURRENT_INGREDIENT = "ADD_CURRENT_INGREDIENT";
export const DELETE_CURRENT_INGREDIENT = "DELETE_CURRENT_INGREDIENT";

export const addCurrentIngredient = (ingredient) => ({
  type: ADD_CURRENT_INGREDIENT,
  ingredientAdded: ingredient,
});

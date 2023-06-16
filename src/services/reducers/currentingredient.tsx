import {
  ADD_CURRENT_INGREDIENT,
  DELETE_CURRENT_INGREDIENT,
} from "../actions/currentingredient";
import {
  TCurrentIngredientActions,
  TCurrentIngredientState,
} from "../types/types";

export const initialState: TCurrentIngredientState = {
  ingredient: {},
};

export const currentIngredient = (
  state = initialState,
  action: TCurrentIngredientActions
) => {
  switch (action.type) {
    case ADD_CURRENT_INGREDIENT:
      return { state: { ...action.ingredientAdded } };
    case DELETE_CURRENT_INGREDIENT:
      return { state: {} };
    default:
      return state;
  }
};

import {
  ADD_INGREDIENT,
  DELETE_INGREDIENT,
  SORT_ITEMS,
  RESET_INGREDIENT,
} from "../actions/currentburgeringredients";

import {
  TCurrentBurgerIngredientActions,
  TCurrentBurgerIngredientState,
} from "../types/types";

const initialState: TCurrentBurgerIngredientState = {
  bun: null,
  ingredientsadded: [],
};

export const currentBurgerIngredients = (
  state = initialState,
  action: TCurrentBurgerIngredientActions
) => {
  switch (action.type) {
    case SORT_ITEMS:
      return {
        ...state,
        ingredientsadded: action.indredients,
      };

    case DELETE_INGREDIENT:
      return {
        ...state,
        ingredientsadded: state.ingredientsadded.filter(
          (element: any) => element.unicID !== action.unicID
        ),
      };

    case RESET_INGREDIENT:
      return { ...state, ingredientsadded: [], bun: null };

    case ADD_INGREDIENT:
      if (action.ingredientsadded.type === "bun") {
        return {
          ...state,
          bun: { ...action.ingredientsadded },
        };
      } return {
        ...state,
        ingredientsadded: [...state.ingredientsadded, action.ingredientsadded],
      };

    default:
      return state;
  }
};

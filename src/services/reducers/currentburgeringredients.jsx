import {
  ADD_INGREDIENT,
  DELETE_INGREDIENT,
  SORT_ITEMS,
} from "./../actions/currentburgeringredients";

const initialState = {
  bun: null,
  ingredientsadded: [],
};

export const currentBurgerIngredients = (state = initialState, action) => {
  switch (action.type) {
    case ADD_INGREDIENT:
      return {
        ...state,
        bun: action.bun,
        ingredientsadded: [...state.ingredientsadded, action.ingredientsadded],
      };
    case SORT_ITEMS:
      console.log("sortitems")
      return {
        ...state,
        ingredientsadded: action.indredients,
      };

    case DELETE_INGREDIENT:
      return { ...state, state: action.item };
    default:
      return state;
  }
};

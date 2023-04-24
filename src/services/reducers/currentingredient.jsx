import { ADD_CURRENT_INGREDIENT } from "./../actions/currentingredient";

const initialState = {};

export const currentIngredient = (state = initialState, action) => {
  switch (action.type) {
    case ADD_CURRENT_INGREDIENT:
         return { ...state, state: {...action.ingredientAdded }};
    // case DELETE_ELEM.type:
    //   return { ...state, state: action.item };
    default:
      return state;
  }
};

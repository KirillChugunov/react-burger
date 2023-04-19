import { ADD_ELEM, DELETE_ELEM } from "./../actions/currentingredient";

const initialState = {};

export const currentIngredient = (state = initialState, action) => {
  switch (action.type) {
    case ADD_ELEM.type:
      return { ...state, state: action.item };
    case DELETE_ELEM.type:
      return { ...state, state: action.item };
    default:
      return state;
  }
};

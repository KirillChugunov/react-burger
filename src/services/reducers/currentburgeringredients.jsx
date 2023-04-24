import {
  ADD_INGREDIENT,
  DELETE_INGREDIENT,
  SORT_ITEMS,RESET_INGREDIENT
} from "./../actions/currentburgeringredients";

const initialState = {
  bun: null,
  ingredientsadded: [],
};

export const currentBurgerIngredients = (state = initialState, action) => {
  switch (action.type) {
    case ADD_INGREDIENT:
      if (action.ingredientsadded.type === "bun")
       {return {
        ...state,
        bun:{...action.ingredientsadded}
      }}

      else if (action.ingredientsadded.type === "sauce" || "main")
      return {
        ...state,
        ingredientsadded: [...state.ingredientsadded, action.ingredientsadded],
      };

    case SORT_ITEMS:
       return {
        ...state,
        ingredientsadded: action.indredients,
      };

    case DELETE_INGREDIENT:
      return {  ...state,
        ingredientsadded: state.ingredientsadded.filter((element)=> element.unicID !== action.unicID)};

    case RESET_INGREDIENT:
          return {  ...state,
            ingredientsadded:[],
            bun:null
          };

    default:
      return state;
  }
};

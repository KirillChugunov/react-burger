import { combineReducers } from 'redux';
import { currentIngredient } from "./currentingredient"
import { ingredientList } from "./ingredientList"
import { currentBurgerIngredients } from "./currentburgeringredients"

export const rootReducer = combineReducers({
  currentBurgerIngredients,
  ingredientList,
  currentIngredient,
}) 
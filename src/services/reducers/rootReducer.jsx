import { combineReducers } from 'redux';
import { currentIngredient } from "./currentingredient"
import { ingredientList } from "./ingredientList"
import { currentBurgerIngredients } from "./currentburgeringredients"
import { order } from "./order"
import thunk from 'redux-thunk';

export const rootReducer = combineReducers({
  currentBurgerIngredients,
  ingredientList,
  currentIngredient,
  order
}) 
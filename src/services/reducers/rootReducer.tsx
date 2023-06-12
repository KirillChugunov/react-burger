import { combineReducers } from "redux";
import { currentIngredient } from "./currentingredient";
import { ingredientList } from "./ingredientList";
import { currentBurgerIngredients } from "./currentburgeringredients";
import { order } from "./order";
import { authentication } from "./authentication";
import { wsReducer } from "../middleware/wsmiddlewareReduser";

export const rootReducer = combineReducers({
  currentIngredient,
  currentBurgerIngredients,
  ingredientList,
  order,
  authentication,
  wsReducer,
});

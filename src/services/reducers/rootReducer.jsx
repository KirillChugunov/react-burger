import { combineReducers } from "redux";
import { currentIngredient } from "./currentingredient";
import { ingredientList } from "./ingredientList";
import { currentBurgerIngredients } from "./currentburgeringredients";
import { order } from "./order";
import { authentification } from "./authentification";
import { wsReducer } from "../middleware/wsmiddlewareReduser"
import thunk from "redux-thunk";

export const rootReducer = combineReducers({
  currentBurgerIngredients,
  ingredientList,
  currentIngredient,
  order,
  authentification,
  wsReducer
});

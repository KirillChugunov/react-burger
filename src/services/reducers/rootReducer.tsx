import { combineReducers } from "redux";
import { currentIngredient } from "./currentingredient";
import { ingredientList } from "./ingredientList";
import { currentBurgerIngredients } from "./currentburgeringredients";
import { order } from "./order";
import { authentification } from "./authentification";
import { wsReducer } from "../middleware/wsmiddlewareReduser";
import { wsReducerAuth } from "../middleware-auth/wsmiddlewareReduser-auth";


export const rootReducer = combineReducers({
  currentBurgerIngredients,
  ingredientList,
  order,
  authentification,
  wsReducer,
  wsReducerAuth,
});

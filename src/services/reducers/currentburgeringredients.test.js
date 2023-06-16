import * as types from "../actions/currentburgeringredients";
import {
  bunForTest,
  mainForTest,
  sortedArrayForTest,
} from "../hardcodefortests";
import { currentBurgerIngredients } from "./currentburgeringredients";
import { initialState } from "./currentburgeringredients";

describe("currentBurgerIngredients reducer", () => {
  it("should return the initial state", () => {
    expect(currentBurgerIngredients(initialState, {})).toEqual(initialState);
  });

  it("should handle RESET_INGREDIENT", () => {
    expect(
      currentBurgerIngredients(initialState, {
        type: types.RESET_INGREDIENT,
      })
    ).toEqual({
      bun: null,
      ingredientsadded: [],
    });
  });

  it("should handle ADD_INGREDIENT-bun", () => {
    expect(
      currentBurgerIngredients(initialState, {
        type: types.ADD_INGREDIENT,
        ingredientsadded: bunForTest,
      })
    ).toEqual({
      ...initialState,
      bun: bunForTest,
      ingredientsadded: [],
    });
  });

  it("should handle ADD_INGREDIENT", () => {
    expect(
      currentBurgerIngredients(initialState, {
        type: types.ADD_INGREDIENT,
        ingredientsadded: mainForTest,
      })
    ).toEqual({
      ...initialState,
      ingredientsadded: [...initialState.ingredientsadded, mainForTest],
    });
  });

  it("should handle SORT_ITEMS", () => {
    expect(
      currentBurgerIngredients(initialState, {
        type: types.SORT_ITEMS,
        indredients: sortedArrayForTest,
      })
    ).toEqual({
      ...initialState,
      ingredientsadded: sortedArrayForTest,
    });
  });
});

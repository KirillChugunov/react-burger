import * as types from "../actions/currentburgeringredients";
import {
  bunForTest,
  mainForTest,
  sortedArrayForTest,
} from "../hardcodefortests";
import { currentBurgerIngredients } from "./currentburgeringredients";

const InitSt = {
  bun: null,
  ingredientsadded: [],
};

describe("currentBurgerIngredients reducer", () => {
  it("should return the initial state", () => {
    expect(currentBurgerIngredients(InitSt, {})).toEqual({
      bun: null,
      ingredientsadded: [],
    });
  });

  it("should handle RESET_INGREDIENT", () => {
    expect(
      currentBurgerIngredients([], {
        type: types.RESET_INGREDIENT,
      })
    ).toEqual({
      bun: null,
      ingredientsadded: [],
    });
  });

  it("should handle ADD_INGREDIENT-bun", () => {
    expect(
      currentBurgerIngredients(InitSt, {
        type: types.ADD_INGREDIENT,
        ingredientsadded: bunForTest,
      })
    ).toEqual({
      ...InitSt,
      bun: bunForTest,
      ingredientsadded: [],
    });
  });

  it("should handle ADD_INGREDIENT", () => {
    expect(
      currentBurgerIngredients(InitSt, {
        type: types.ADD_INGREDIENT,
        ingredientsadded: mainForTest,
      })
    ).toEqual({
      ...InitSt,
      ingredientsadded: [...InitSt.ingredientsadded, mainForTest],
    });
  });

  it("should handle SORT_ITEMS", () => {
    expect(
      currentBurgerIngredients(InitSt, {
        type: types.SORT_ITEMS,
        indredients: sortedArrayForTest,
      })
    ).toEqual({
      ...InitSt,
      ingredientsadded: sortedArrayForTest,
    });
  });
});

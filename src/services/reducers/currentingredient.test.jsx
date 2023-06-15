import * as types from "../actions/currentingredient";
import { arrayForTest, bunForTest } from "../hardcodefortests";
import { currentIngredient } from "./currentingredient";

const InitSt = {};

describe("currentingredient reducer", () => {
  it("should return the initial state", () => {
    expect(currentIngredient(InitSt, {})).toEqual(InitSt);
  });

  it("should handle ADD_CURRENT_INGREDIENT", () => {
    expect(
      currentIngredient(InitSt, {
        type: types.ADD_CURRENT_INGREDIENT,
        ingredientAdded: bunForTest,
      })
    ).toEqual({
      state: { ...bunForTest },
    });
  });

  it("should handle DELETE_CURRENT_INGREDIENT", () => {
    expect(
      currentIngredient(InitSt, {
        type: types.DELETE_CURRENT_INGREDIENT,
      })
    ).toEqual({
      state: {},
    });
  });
});

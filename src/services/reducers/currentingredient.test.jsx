import * as types from "../actions/currentingredient";
import { arrayForTest, bunForTest } from "../hardcodefortests";
import { currentIngredient, initialState } from "./currentingredient";

describe("currentingredient reducer", () => {
  it("should return the initial state", () => {
    expect(currentIngredient(initialState, {})).toEqual(initialState);
  });

  it("should handle ADD_CURRENT_INGREDIENT", () => {
    expect(
      currentIngredient(initialState, {
        type: types.ADD_CURRENT_INGREDIENT,
        ingredientAdded: bunForTest,
      })
    ).toEqual({
      state: { ...bunForTest },
    });
  });

  it("should handle DELETE_CURRENT_INGREDIENT", () => {
    expect(
      currentIngredient(initialState, {
        type: types.DELETE_CURRENT_INGREDIENT,
      })
    ).toEqual({
      state: {},
    });
  });
});

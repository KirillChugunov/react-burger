import * as types from "../actions/ingredientList";
import { arrayForTest } from "../hardcodefortests";
import { ingredientList, initialState } from "./ingredientList";

describe("ingredientList reducer", () => {
  it("should return the initial state", () => {
    expect(ingredientList(undefined, {})).toEqual({
      feedRequest: false,
      feedFailed: false,
      feed: [],
    });
  });

  it("should handle GET_FEED", () => {
    expect(
      ingredientList(initialState, {
        type: types.GET_FEED,
      })
    ).toEqual({
      ...initialState,
      feedRequest: true,
      feedFailed: false,
    });
  });

  it("should handle GET_FEED_SUCCESS", () => {
    expect(
      ingredientList(initialState, {
        type: types.GET_FEED_SUCCESS,
        feed: arrayForTest,
        feedRequest: false,
      })
    ).toEqual({
      ...initialState,
      feed: arrayForTest,
      feedRequest: false,
    });
  });
});

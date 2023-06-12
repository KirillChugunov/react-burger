import * as types from "../actions/ingredientList";
import { arrayForTest } from "../hardcodefortests";
import { ingredientList } from "./ingredientList";

const InitSt = {
  feedRequest: false,
  feedFailed: false,
  feed: [],
};

describe("ingredientList reducer", () => {
  it("should return the initial state", () => {
    expect(ingredientList(InitSt, {})).toEqual({
      feedRequest: false,
      feedFailed: false,
      feed: [],
    });
  });

  it("should handle GET_FEED", () => {
    expect(
      ingredientList(InitSt, {
        type: types.GET_FEED,
      })
    ).toEqual({
      ...InitSt,
      feedRequest: true,
      feedFailed: false,
    });
  });

  it("should handle GET_FEED_SUCCESS", () => {
    expect(
      ingredientList(InitSt, {
        type: types.GET_FEED_SUCCESS,
        feed: arrayForTest,
        feedRequest: false,
      })
    ).toEqual({
      ...InitSt,
      feed: arrayForTest,
      feedRequest: false,
    });
  });
});

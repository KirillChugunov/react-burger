import * as types from "../actions/order";
import { idsArray } from "../hardcodefortests";
import { order, initialState } from "./order";

describe("ingredientList reducer", () => {
  it("should return the initial state", () => {
    expect(order(initialState, {})).toEqual({
      ingredientIDs: [],
      orderNumber: "",
      orderSent: false,
      orderConfirmed: false,
      orderFailed: false,
    });
  });

  it("should handle GET_IDS", () => {
    expect(
      order(initialState, {
        type: types.GET_IDS,
        idsArr: idsArray,
      })
    ).toEqual({
      ...initialState,
      ingredientIDs: [...idsArray],
      orderNumber: "",
      orderSent: false,
      orderConfirmed: false,
      orderFailed: false,
    });
  });

  it("should handle GET_ORDER", () => {
    expect(
      order(initialState, {
        type: types.GET_ORDER,
        orderSent: true,
      })
    ).toEqual({
      ...initialState,
      ingredientIDs: [],
      orderNumber: "",
      orderSent: true,
      orderConfirmed: false,
      orderFailed: false,
    });
  });

  it("should handle GET_ORDER_SUCCESS", () => {
    expect(
      order(initialState, {
        type: types.GET_ORDER_SUCCESS,
        ordernumber: "number",
        orderSent: false,
        orderConfirmed: true,
      })
    ).toEqual({
      ...initialState,
      ingredientIDs: [],
      orderNumber: "number",
      orderSent: false,
      orderConfirmed: true,
      orderFailed: false,
    });
  });

  it("should handle GET_ORDER_FAILED", () => {
    expect(
      order(initialState, {
        type: types.GET_ORDER_FAILED,
        orderFailed: true,
        orderSent: false,
      })
    ).toEqual({
      ...initialState,
      orderSent: false,
      orderFailed: true,
    });
  });
});

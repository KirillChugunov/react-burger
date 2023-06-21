import * as types from "../actions/order";
import { idsArray } from "../hardcodefortests";
import { order, initialState } from "./order";

describe("ingredientList reducer", () => {
  it("should return the initial state", () => {
    expect(order(undefined, {})).toEqual({
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
       orderSent: true,
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
      orderNumber: "number",
      orderSent: false,
      orderConfirmed: true,
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

import * as types from "../actions/order";
import { idsArray } from "../hardcodefortests";
import { order } from "./order";

const InitSt = {
  ingredientIDs: [],
  orderNumber: "",
  orderSent: false,
  orderConfirmed: false,
  orderFailed: false,
};

describe("ingredientList reducer", () => {
  it("should return the initial state", () => {
    expect(order(InitSt, {})).toEqual({
      ingredientIDs: [],
      orderNumber: "",
      orderSent: false,
      orderConfirmed: false,
      orderFailed: false,
    });
  });

  it("should handle GET_IDS", () => {
    expect(
      order(InitSt, {
        type: types.GET_IDS,
        idsArr: idsArray,
      })
    ).toEqual({
      ...InitSt,
      ingredientIDs: [...idsArray],
      orderNumber: "",
      orderSent: false,
      orderConfirmed: false,
      orderFailed: false,
    });
  });

  it("should handle GET_ORDER", () => {
    expect(
      order(InitSt, {
        type: types.GET_ORDER,
        orderSent: true,
      })
    ).toEqual({
      ...InitSt,
      ingredientIDs: [],
      orderNumber: "",
      orderSent: true,
      orderConfirmed: false,
      orderFailed: false,
    });
  });

  it("should handle GET_ORDER_SUCCESS", () => {
    expect(
      order(InitSt, {
        type: types.GET_ORDER_SUCCESS,
        ordernumber: "number",
        orderSent: false,
        orderConfirmed: true,
      })
    ).toEqual({
      ...InitSt,
      ingredientIDs: [],
      orderNumber: "number",
      orderSent: false,
      orderConfirmed: true,
      orderFailed: false,
    });
  });

  it("should handle GET_ORDER_FAILED", () => {
    expect(
      order(InitSt, {
        type: types.GET_ORDER_FAILED,
        orderFailed: true,
        orderSent: false,
      })
    ).toEqual({
      ...InitSt,
      orderSent: false,
      orderFailed: true,
    });
  });
});

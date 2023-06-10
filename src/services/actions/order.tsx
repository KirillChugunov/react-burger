import { sendOrderToServer } from "../Api/api";
import { AppDispatch, AppThunk } from "../types/types";
import { RESET_INGREDIENT } from "./currentburgeringredients";
export const GET_IDS: "GET_IDS" = "GET_IDS";
export const GET_ORDER: "GET_ORDER" = "GET_ORDER";
export const GET_ORDER_FAILED: "GET_ORDER_FAILED" = "GET_ORDER_FAILED";
export const GET_ORDER_SUCCESS: "GET_ORDER_SUCCESS" = "GET_ORDER_SUCCESS";
export { sendOrderToServer } from "../Api/api";

export const getIDsArray = (IDs: Array<string>) => ({
  type: GET_IDS,
  idsArr: IDs,
});

export const sentOrder: AppThunk = (newObj: object) => {
  return function (dispatch: AppDispatch) {
    dispatch({
      type: GET_ORDER,
    });
    sendOrderToServer(newObj)
      .then(
        (res) => (
          dispatch({
            type: GET_ORDER_SUCCESS,
            ordernumber: res.order.number,
          }),
          dispatch({
            type: RESET_INGREDIENT,
          })
        )
      )
      .catch((err) => {
        console.log(err);
        dispatch({
          type: GET_ORDER_FAILED,
        });
      });
  };
};

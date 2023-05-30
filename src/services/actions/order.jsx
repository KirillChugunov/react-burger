import { sendOrderToServer } from "../Api/api";
import { RESET_INGREDIENT } from "./currentburgeringredients";
export const GET_IDS = "GET_IDS";
export const GET_ORDER = "GET_ORDER";
export const GET_ORDER_FAILED = "GET_ORDER_FAILED";
export const GET_ORDER_SUCCESS = "GET_ORDER_SUCCESS";
export { sendOrderToServer } from "./../Api/api";

export const getIDsArray = (IDs) => ({
  type: GET_IDS,
  idsArr: IDs,
});

export function sentOrder(newObj) {
  return function (dispatch) {
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
}

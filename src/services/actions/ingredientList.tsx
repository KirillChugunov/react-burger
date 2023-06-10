import { Dispatch } from "redux";
import { getIngredientsFromServer } from "../Api/api";
import { AppDispatch, AppThunk } from "../types/types";
export const GET_FEED: "GET_FEED" = "GET_FEED";
export const GET_FEED_FAILED: "GET_FEED_FAILED" = "GET_FEED_FAILED";
export const GET_FEED_SUCCESS: "GET_FEED_SUCCESS" = "GET_FEED_SUCCESS";

export const getFeed: AppThunk = () => {
  return function (dispatch: AppDispatch) {
    dispatch({
      type: GET_FEED,
    });
    getIngredientsFromServer()
      .then((res) =>
        dispatch({
          type: GET_FEED_SUCCESS,
          feed: res.data,
        })
      )
      .catch((err) => {
        // Если сервер не вернул данных, также отправляем экшен об ошибке
        dispatch({
          type: GET_FEED_FAILED,
        });
      });
  };
};

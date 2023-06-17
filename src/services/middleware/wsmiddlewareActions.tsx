import { AppDispatch, AppThunk } from "../types/types";

export const WS_CONNECTION_START: "WS_CONNECTION_START" = "WS_CONNECTION_START";
export const WS_CONNECTION_SUCCESS: "WS_CONNECTION_SUCCESS" =
  "WS_CONNECTION_SUCCESS";
export const WS_CONNECTION_ERROR: "WS_CONNECTION_ERROR" = "WS_CONNECTION_ERROR";
export const WS_CONNECTION_CLOSED: "WS_CONNECTION_CLOSED" =
  "WS_CONNECTION_CLOSED";
export const WS_GET_MESSAGE: "WS_GET_MESSAGE" = "WS_GET_MESSAGE";
export const WS_CONNECTION_STOP: "WS_CONNECTION_STOP" = "WS_CONNECTION_STOP";

export const getOrdersFeed: AppThunk = (url) => {
  return function (dispatch: AppDispatch) {
    dispatch({
      type: WS_CONNECTION_START,
      payload: url,
    });
  };
};

export const stopOrdersFeed: AppThunk = () => {
  return function (dispatch: AppDispatch) {
    dispatch({
      type: WS_CONNECTION_STOP,
    });
  };
};

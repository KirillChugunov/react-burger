import { AppDispatch, AppThunk } from "../types/types";

export const WS_CONNECTION_START_AUTH: "WS_CONNECTION_START_AUTH" =
  "WS_CONNECTION_START_AUTH";
export const WS_CONNECTION_SUCCESS_AUTH: "WS_CONNECTION_SUCCESS_AUTH" =
  "WS_CONNECTION_SUCCESS_AUTH";
export const WS_CONNECTION_ERROR_AUTH: "WS_CONNECTION_ERROR_AUTH" =
  "WS_CONNECTION_ERROR_AUTH";
export const WS_CONNECTION_CLOSED_AUTH: "WS_CONNECTION_CLOSED_AUTH" =
  "WS_CONNECTION_CLOSED_AUTH";
export const WS_GET_MESSAGE_AUTH: "WS_GET_MESSAGE_AUTH" = "WS_GET_MESSAGE_AUTH";
export const WS_SEND_MESSAGE_AUTH: "WS_SEND_MESSAGE_AUTH" =
  "WS_SEND_MESSAGE_AUTH";

export const getfeeeeeeeeeeeedAuth:AppThunk = () => {
  return function (dispatch: AppDispatch) {
    dispatch({
      type: WS_CONNECTION_START_AUTH
    });
  };
};

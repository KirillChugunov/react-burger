import { Middleware, MiddlewareAPI } from "redux";
import { getCookie } from "../Coockie/getCookie";
import { AppDispatch, RootState, TwsmiddlewareAuthActions } from "../types/types";


export const socketMiddlewareAuth = (wsUrl:string):Middleware  => {
  return ((store:MiddlewareAPI<AppDispatch, RootState>) => {
    let socket:WebSocket | null = null;

    return (next) => (action:TwsmiddlewareAuthActions) => {
      const { dispatch } = store;
      const { type } = action;

      if (type === "WS_CONNECTION_START_AUTH") {
        socket = new WebSocket(wsUrl + "?token=" +
        `${getCookie("accessToken")?.replace("Bearer ", "")}`)}

      if (socket) {
        // функция, которая вызывается при открытии сокета
        socket.onopen = (event) => {
          dispatch({ type: "WS_CONNECTION_SUCCESS_AUTH", payload: event });
        };

        // функция, которая вызывается при ошибке соединения
        socket.onerror = (event) => {
          dispatch({ type: "WS_CONNECTION_ERROR_AUTH", payload: event });
        };

        // функция, которая вызывается при получения события от сервера
        socket.onmessage = (event) => {
          const data = JSON.parse(event.data);
          dispatch({ type: "WS_GET_MESSAGE_AUTH", payload: data });
        };
        // функция, которая вызывается при закрытии соединения
        socket.onclose = (event) => {
          dispatch({ type: "WS_CONNECTION_CLOSED_AUTH", payload: event });
        };
      }

      next(action);
    };
  }) as Middleware;
};

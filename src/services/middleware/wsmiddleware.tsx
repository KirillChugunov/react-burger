import { Middleware, MiddlewareAPI } from "redux";
import { AppDispatch, RootState, TwsmiddlewareActions } from "../types/types";


export const socketMiddleware = (wsUrl:string):Middleware => {
  return ((store:MiddlewareAPI<AppDispatch, RootState>) => {
    let socket:WebSocket | null = null;

    return (next) => (action:TwsmiddlewareActions) => {
      const { dispatch } = store;
      const { type } = action;

      if (type === "WS_CONNECTION_START") {
        // объект класса WebSocket
        socket = new WebSocket(wsUrl);
      }

      if (socket) {
        // функция, которая вызывается при открытии сокета
        socket.onopen = (event) => {
          dispatch({ type: "WS_CONNECTION_SUCCESS", payload: event });
        };

        // функция, которая вызывается при ошибке соединения
        socket.onerror = (event) => {
          dispatch({ type: "WS_CONNECTION_ERROR", payload: event });
        };

        // функция, которая вызывается при получения события от сервера
        socket.onmessage = (event) => {
          const data = JSON.parse(event.data);
          dispatch({ type: "WS_GET_MESSAGE", payload: data });
        };
        // функция, которая вызывается при закрытии соединения
        socket.onclose = (event) => {
          dispatch({ type: "WS_CONNECTION_CLOSED", payload: event });
        };
      }

      next(action);
    };
  }) as Middleware;
};

import { Middleware, MiddlewareAPI } from "redux";
import { AppDispatch, RootState, TwsmiddlewareActions } from "../types/types";
import { WS_CONNECTION_CLOSED, WS_CONNECTION_ERROR, WS_CONNECTION_START, WS_CONNECTION_STOP, WS_CONNECTION_SUCCESS, WS_GET_MESSAGE } from "./wsmiddlewareActions";

export const socketMiddleware = (): Middleware => {
  return ((store: MiddlewareAPI<AppDispatch, RootState>) => {
    let socket: WebSocket | null = null;

    return (next) => (action: TwsmiddlewareActions) => {
      const { dispatch } = store;
      const { type } = action;

      if (type === WS_CONNECTION_START) {
        // объект класса WebSocket
        socket = new WebSocket(action.payload);
      }
      if (type === WS_CONNECTION_STOP)
       {socket?.close(1000, 'Соединение закрыто') }

      if (socket) {
        // функция, которая вызывается при открытии сокета
        socket.onopen = (event) => {
          dispatch({ type: WS_CONNECTION_SUCCESS, payload: event });
        };

        // функция, которая вызывается при ошибке соединения
        socket.onerror = (event) => {
          dispatch({ type: WS_CONNECTION_ERROR, payload: event });
        };

        // функция, которая вызывается при получения события от сервера
        socket.onmessage = (event) => {
          const data = JSON.parse(event.data);
          dispatch({ type: WS_GET_MESSAGE, payload: data });
        };
        // функция, которая вызывается при закрытии соединения
        socket.onclose = (event) => {
          dispatch({ type: WS_CONNECTION_CLOSED, payload: event });
        };
      }

      next(action);
    };
  }) as Middleware;
};

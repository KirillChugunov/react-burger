import { useSelector } from "react-redux";
import { Middleware, MiddlewareAPI } from "redux";

// import  { AppActions, AppDispatch, RootState } from '../types';

export const socketMiddlewareAuth
 = (wsUrl) => {
  return (store) => {
    let socket = null;

    return (next) => (action) => {
      const { dispatch, getState } = store;
      const { type, payload } = action;

      if (type === "WS_CONNECTION_START_AUTH") {
        socket = new WebSocket(wsUrl);
        console.log(wsUrl)
      }

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
          console.log(data)
          dispatch({ type: "WS_GET_MESSAGE_AUTH", payload: data });
        };
        // функция, которая вызывается при закрытии соединения
        socket.onclose = (event) => {
          dispatch({ type: "WS_CONNECTION_CLOSED_AUTH", payload: event });
        };

        if (type === "WS_SEND_MESSAGE_AUTH") {
          const message = payload;
          // функция для отправки сообщения на сервер
          socket.send(JSON.stringify(message));
        }
      }

      next(action);
    };
  };
};

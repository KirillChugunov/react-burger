import {
  GET_FEED,
  GET_FEED_FAILED,
  GET_FEED_SUCCESS,
} from "../../services/actions/ingredientList";

import { useSelector } from "react-redux";

export const config = {
  baseUrl: "https://mesto.nomoreparties.co/v1/wbf-cohort-6",
  headers: {
    authorization: "d1f78d2c-b56d-404a-8b1d-91f3bcf47ed4",
    "Content-Type": "application/json",
  },
};

const ingredientsURL = "https://norma.nomoreparties.space/api/ingredients";
export function getFeed() {
  // Воспользуемся первым аргументом из усилителя redux-thunk - dispatch
  return function (dispatch) {
    // Проставим флаг в хранилище о том, что мы начали выполнять запрос
    // Это нужно, чтоб отрисовать в интерфейсе лоудер или заблокировать
    // ввод на время выполнения запроса
    dispatch({
      type: GET_FEED,
    });
    // Запрашиваем данные у сервера
    fetch(ingredientsURL)
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка ${res.status}`);
      })
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
}

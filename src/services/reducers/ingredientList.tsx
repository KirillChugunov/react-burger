import {
  GET_FEED,
  GET_FEED_FAILED,
  GET_FEED_SUCCESS,
} from "../actions/ingredientList";
import { TIngredientListActions, TIngredientListState } from "../types/types";

const initialState: TIngredientListState = {
  feedRequest: false,
  feedFailed: false,
  feed: [],
};

export const ingredientList = (
  state = initialState,
  action: TIngredientListActions
) => {
  switch (action.type) {
    case GET_FEED: {
      return {
        ...state,
        // Запрос начал выполняться
        feedRequest: true,
        // Сбрасываем статус наличия ошибок от предыдущего запроса
        // на случай, если он был и завершился с ошибкой
        feedFailed: false,
      };
    }
    case GET_FEED_SUCCESS: {
      return {
        ...state,
        // Запрос выполнился успешно, помещаем полученные данные в хранилище
        feed: action.feed,
        // Запрос закончил своё выполнение
        feedRequest: false,
      };
    }
    case GET_FEED_FAILED: {
      return {
        ...state,
        // Запрос выполнился с ошибкой,
        // выставляем соответсвующие значения в хранилище
        feedFailed: true,
        // Запрос закончил своё выполнение
        feedRequest: false,
      };
    }
    default: {
      return state;
    }
  }
};

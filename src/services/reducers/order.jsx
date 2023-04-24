import {
  GET_IDS,
  GET_ORDER,
  GET_ORDER_FAILED,
  GET_ORDER_SUCCESS,
} from "./../actions/order";

const initialState = {
  ingredientIDs: [],
  orderNumber: "",
  orderSent: false,
  orderConfirmed: false,
  orderFailed:false
};

export const order = (state = initialState, action) => {
  switch (action.type) {
    case GET_IDS: {
      return {
        ...state,
        ingredientIDs: [...action.idsArr],
      };
    }
  }
  switch (action.type) {
    case GET_ORDER: {
      return {
        ...state,
        // Запрос начал выполняться
        orderSent: true,
        // Сбрасываем статус наличия ошибок от предыдущего запроса
        // на случай, если он был и завершился с ошибкой
        feedFailed: false,
      };
    }
    case GET_ORDER_SUCCESS: {
        return {
        ...state,
        // Запрос выполнился успешно, помещаем полученные данные в хранилище
        orderNumber: action.ordernumber,
        // Запрос закончил своё выполнение
        orderSent: false,
        orderConfirmed: true
      };
    }
    case GET_ORDER_FAILED: {
      return {
        ...state,
        // Запрос выполнился с ошибкой,
        // выставляем соответсвующие значения в хранилище
        orderFailed: true,
        // Запрос закончил своё выполнение
        orderSent: false,
      };
    }
    default: {
      return state;
    }
  }
};

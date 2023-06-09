import { store } from "./../../index";
import {
  AUTH_FAILED,
  GET_TOKEN_ONLOAD,
  GET_USERINFO,
  GET_USER_ONLOAD,
  LOGIN,
  LOGOUT,
  REGISTRATION,
  SET_USERINFO,
} from "../actions/authentification";
import {
  ADD_INGREDIENT,
  DELETE_INGREDIENT,
  RESET_INGREDIENT,
  SORT_ITEMS,
} from "../actions/currentburgeringredients";
import {
  ADD_CURRENT_INGREDIENT,
  DELETE_CURRENT_INGREDIENT,
} from "../actions/currentingredient";
import {
  GET_FEED,
  GET_FEED_FAILED,
  GET_FEED_SUCCESS,
} from "../actions/ingredientList";
import {
  GET_IDS,
  GET_ORDER,
  GET_ORDER_FAILED,
  GET_ORDER_SUCCESS,
} from "../actions/order";
import {
  WS_CONNECTION_CLOSED_AUTH,
  WS_CONNECTION_ERROR_AUTH,
  WS_CONNECTION_START_AUTH,
  WS_CONNECTION_SUCCESS_AUTH,
  WS_GET_MESSAGE_AUTH,
  WS_SEND_MESSAGE_AUTH,
} from "../middleware-auth/wsmiddlewareActions-auth";
import { Action, ActionCreator} from 'redux';
import { ThunkAction } from "redux-thunk";
import { ArrayTypeNode } from "typescript";
import { WS_CONNECTION_CLOSED, WS_CONNECTION_ERROR, WS_CONNECTION_START, WS_CONNECTION_SUCCESS, WS_GET_MESSAGE, WS_SEND_MESSAGE } from "../middleware/wsmiddlewareActions";
import {
  TypedUseSelectorHook,
  useSelector as selectorHook,
  useDispatch as dispatchHook,
} from 'react-redux';

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch; 


export type AppThunk<TReturn = void> = ActionCreator<
ThunkAction<TReturn, Action, RootState, TApplicationActions>
>
export const useSelector: TypedUseSelectorHook<RootState> = selectorHook; 
export const useDispatch = () => dispatchHook<AppDispatch | AppThunk>; 




export type Tingredient = {
  _id: string;
  name: string;
  type: string;
  proteins: number;
  fat: number;
  carbohydrates: number;
  calories: number;
  price: number;
  image: string;
};

export type TingredientAndUnicID = Tingredient & {
  unicID: string;
  index?: number;
};

export type TTextString = {
  ingredients?: string;
};

///////////////Oder
export interface IGetIds {
  readonly type: typeof GET_IDS;
  readonly idsArr: any;
}

export interface IGetOrders {
  readonly type: typeof GET_ORDER;
}

export interface IGetOrderFailed {
  readonly type: typeof GET_ORDER_FAILED;
}
export interface IGetOrderSuccess {
  readonly type: typeof GET_ORDER_SUCCESS;
  readonly ordernumber: any;
}

export type TOrderState = {
  ingredientIDs: Array<Object>;
  orderNumber: string;
  orderSent: boolean;
  orderConfirmed: boolean;
  orderFailed: boolean;
};

export type TOrderActions =
  | IGetIds
  | IGetOrders
  | IGetOrderFailed
  | IGetOrderSuccess;

/////////////////////////currentburgeringredients

export interface IAddIngredient {
  readonly type: typeof ADD_INGREDIENT;
  readonly ingredientsadded: TingredientAndUnicID;
}

export interface IDeleteIngredient {
  readonly type: typeof DELETE_INGREDIENT;
  readonly unicID: TingredientAndUnicID;
}

export interface ISortItems {
  readonly type: typeof SORT_ITEMS;
  readonly indredients: Array<TingredientAndUnicID>;
}
export interface IResetIngredient {
  readonly type: typeof RESET_INGREDIENT;
}

export type TCurrentBurgerIngredientState = {
  bun: TingredientAndUnicID | null;
  ingredientsadded: Array<TingredientAndUnicID>;
};

export type TCurrentBurgerIngredientActions =
  | IAddIngredient
  | ISortItems
  | IDeleteIngredient
  | IResetIngredient;

//////////Authentification

export interface IGetUserOnLoad {
  readonly type: typeof GET_USER_ONLOAD;
  readonly name: string;
  readonly email: string;
}
export interface ILogin {
  readonly type: typeof LOGIN;
  readonly name: string;
  readonly email: string;
  readonly accessToken: string;
  readonly refreshToken: string;
}
export interface IGetUserInfo {
  readonly type: typeof GET_USERINFO;
  readonly name: string;
  readonly email: string;
}
export interface ILogout {
  readonly type: typeof LOGOUT;
}
export interface IRegistration {
  readonly type: typeof REGISTRATION;
  readonly name: string;
  readonly email: string;
  readonly accessToken: string;
  readonly refreshToken: string;
}
export interface IGetTokenOnLoad {
  readonly type: typeof GET_TOKEN_ONLOAD;
  readonly accessToken: string;
  readonly refreshToken: string;
}
export interface IAuthFailed {
  readonly type: typeof AUTH_FAILED;
}
export interface ISetUserInfo {
  readonly type: typeof SET_USERINFO;
  readonly name: string;
  readonly email: string;
}

export type TAuthentificationActions =
  | IGetUserOnLoad
  | ILogin
  | IGetUserInfo
  | ILogout
  | IRegistration
  | IGetTokenOnLoad
  | IAuthFailed
  | ISetUserInfo;

export type TAuthentificationState = {
  isLogin: boolean;
  user: {
    email: string;
    name: string;
  };
  accessToken: string;
  refreshToken: string;
  logginCheck: boolean;
};

//////////////////currentingredient

export interface IAddCurrentIngredient {
  readonly type: typeof ADD_CURRENT_INGREDIENT;
  readonly ingredientAdded: TingredientAndUnicID;
}

export interface IDeleteCurrentIngredient {
  readonly type: typeof DELETE_CURRENT_INGREDIENT;
}

export type TCurrentIngredientActions =
  | IAddCurrentIngredient
  | IDeleteCurrentIngredient;

  export type TCurrentIngredientState = null | object

///////////////////////////////////ingredientList

export interface IGetFeed {
  readonly type: typeof GET_FEED;
}

export interface IGetFeedFailed {
  readonly type: typeof GET_FEED_FAILED;
}
export interface IGetFeedSuccess {
  readonly type: typeof GET_FEED_SUCCESS;
  readonly feed: Array<TingredientAndUnicID>;
}

export type TIngredientListActions =
  | IGetFeed
  | IGetFeedFailed
  | IGetFeedSuccess;

export type TIngredientListState = {
  feedRequest: boolean;
  feedFailed: boolean;
  feed: Array<TingredientAndUnicID>;
};

///////////////////////////////wsmiddlewareAuth
export interface IWSConnectionStartAuth {
  readonly type: typeof WS_CONNECTION_START_AUTH;
}

export interface IWSConnectionSuccessAuth {
  readonly type: typeof WS_CONNECTION_SUCCESS_AUTH;
  readonly payload: any
}
export interface IWSConnectionErrorAuth {
  readonly type: typeof WS_CONNECTION_ERROR_AUTH;
  readonly payload: any
}
export interface IWSConnectionClosedAuth {
  readonly type: typeof WS_CONNECTION_CLOSED_AUTH;
  readonly payload: any
}
export interface IWSConnectionGetMessageAuth {
  readonly type: typeof WS_GET_MESSAGE_AUTH;
  readonly payload: any
}
export interface IWSConnectionSendMessageAuth {
  readonly type: typeof WS_SEND_MESSAGE_AUTH;
  readonly payload: any
}

export type TwsmiddlewareAuthState = {
    wsConnected: boolean,
    messages:Object
  };


export type TwsmiddlewareAuthActions =
  | IWSConnectionStartAuth
  | IWSConnectionSuccessAuth
  | IWSConnectionErrorAuth
  | IWSConnectionClosedAuth
  | IWSConnectionGetMessageAuth
  | IWSConnectionSendMessageAuth;


///////////////////////////////wsmiddleware
export interface IWSConnectionStart {
  readonly type: typeof WS_CONNECTION_START;

}
export interface IWSConnectionSuccess {
  readonly type: typeof WS_CONNECTION_SUCCESS;
  readonly payload: any
}
export interface IWSConnectionError {
  readonly type: typeof WS_CONNECTION_ERROR;
  readonly payload: any
}
export interface IWSConnectionClosed {
  readonly type: typeof WS_CONNECTION_CLOSED;
  readonly payload: any
}
export interface IWSConnectionGetMessage {
  readonly type: typeof WS_GET_MESSAGE;
  readonly payload: any
}
export interface IWSConnectionSendMessage {
  readonly type: typeof WS_SEND_MESSAGE;
  readonly payload: any
}

export type TwsmiddlewareState = {
    wsConnected: boolean,
    messages:Object
  };


export type TwsmiddlewareActions =
  | IWSConnectionStart
  | IWSConnectionSuccess
  | IWSConnectionError
  | IWSConnectionClosed
  | IWSConnectionGetMessage
  | IWSConnectionSendMessage;



export type TApplicationActions =
  | TOrderActions
  | TCurrentBurgerIngredientActions
  | TAuthentificationActions
  | TCurrentIngredientActions
  | TIngredientListActions
  | TwsmiddlewareAuthActions
  | TwsmiddlewareActions

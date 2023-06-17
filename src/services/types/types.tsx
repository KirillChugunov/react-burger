import { store } from "../../index";
import {
  AUTH_FAILED,
  GET_TOKEN_ONLOAD,
  GET_USERINFO,
  GET_USER_ONLOAD,
  LOGIN,
  LOGIN_FAILED,
  LOGOUT,
  REGISTRATION,
  SET_USERINFO,
} from "../actions/authentication";
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
import { Action, ActionCreator } from "redux";
import { ThunkAction } from "redux-thunk";
import {
  WS_CONNECTION_CLOSED,
  WS_CONNECTION_ERROR,
  WS_CONNECTION_START,
  WS_CONNECTION_STOP,
  WS_CONNECTION_SUCCESS,
  WS_GET_MESSAGE,
} from "../middleware/wsmiddlewareActions";
import type {} from "redux-thunk/extend-redux";

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export type AppThunk<TReturn = void> = ActionCreator<
  ThunkAction<TReturn, Action, RootState, TApplicationActions>
>;

export type ArrayObj = {
  ingredients?: Array<String>;
};

export type TConfig = {
  method?: string;
  headers: THeaders;
  body?: string;
};

export type THeaders = {
  "Content-Type": string;
  authorization?: string;
};

export type TOrder = {
  createdAt: string;
  ingredients: Array<string>;
  name: string;
  number: number;
  status: string;
  updatedAt: string;
  _id: string;
};

export type Tingredient = {
  calories: number;
  carbohydrates: number;
  fat: number;
  image: string;
  image_large: string;
  image_mobile: string;
  name: string;
  price: number;
  proteins: number;
  type: string;
  __v: number;
  _id: string;
  unicID: string;
};

export type TingredientAndUnicID = Tingredient & {
  index: number;
};

export type TingredientAndCount = TingredientAndUnicID & {
  count: number;
};

export type TTextString = {
  ingredients?: string;
};

///////////////Oder
export interface IGetIds {
  readonly type: typeof GET_IDS;
  readonly idsArr: Array<String>;
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
  readonly unicID: string;
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
  readonly loginCheck: boolean;
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

export interface ILoginFailed {
  readonly type: typeof LOGIN_FAILED;
}

export type TAuthentificationActions =
  | IGetUserOnLoad
  | ILogin
  | IGetUserInfo
  | ILogout
  | IRegistration
  | IGetTokenOnLoad
  | IAuthFailed
  | ISetUserInfo
  | ILoginFailed;

export type TAuthentificationState = {
  isLogin: boolean;
  user: {
    email: string;
    name: string;
  };
  accessToken: string;
  refreshToken: string;
  loginCheck: boolean;
  loginFailed: boolean;
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

export type TCurrentIngredientState = {
  ingredient: Object;
};

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

///////////////////////////////wsmiddleware
export interface IWSConnectionStart {
  readonly type: typeof WS_CONNECTION_START;
  readonly payload: string;
}

export interface IWSConnectionSuccess {
  readonly type: typeof WS_CONNECTION_SUCCESS;
  readonly payload: any;
}
export interface IWSConnectionError {
  readonly type: typeof WS_CONNECTION_ERROR;
  readonly payload: any;
}
export interface IWSConnectionClosed {
  readonly type: typeof WS_CONNECTION_CLOSED;
  readonly payload: any;
}
export interface IWSConnectionGetMessage {
  readonly type: typeof WS_GET_MESSAGE;
  readonly payload: any;
}
export type TwsmiddlewareState = {
  wsConnected: boolean;
  messages: Object;
};

export interface TWSConnectionStop {
  readonly type: typeof WS_CONNECTION_STOP;
}

export type TwsmiddlewareActions =
  | IWSConnectionStart
  | IWSConnectionSuccess
  | IWSConnectionError
  | IWSConnectionClosed
  | IWSConnectionGetMessage
  | TWSConnectionStop;

export type TApplicationActions =
  | TOrderActions
  | TCurrentBurgerIngredientActions
  | TAuthentificationActions
  | TCurrentIngredientActions
  | TIngredientListActions
  | TwsmiddlewareActions;

import {
  AUTH_FAILED,
  GET_TOKEN_ONLOAD,
  GET_USERINFO,
  GET_USER_ONLOAD,
  LOGIN,
  LOGIN_FAILED,
  LOGOUT,
  REGISTRATION,
} from "../actions/authentication";
import {
  TAuthentificationActions,
  TAuthentificationState,
} from "../types/types";

export const initialState: TAuthentificationState = {
  isLogin: false,
  user: {
    email: "",
    name: "",
  },
  accessToken: "",
  refreshToken: "",
  loginCheck: false,
  loginFailed: false,
};

export const authentication = (
  state = initialState,
  action: TAuthentificationActions
) => {
  switch (action.type) {
    case REGISTRATION:
      return {
        ...state,
        user: {
          name: action.name,
          email: action.email,
        },
        accessToken: action.accessToken,
        refreshToken: action.refreshToken,
        isLogin: true,
        loginCheck: true,
      };

    case LOGIN:
      return {
        ...state,
        user: {
          name: action.name,
          email: action.email,
        },
        accessToken: action.accessToken,
        refreshToken: action.refreshToken,
        isLogin: true,
        loginCheck: true,
        loginFailed: false,
      };

    case GET_TOKEN_ONLOAD:
      return {
        ...state,
        accessToken: action.accessToken,
        refreshToken: action.refreshToken,
        isLogin: true,
        loginCheck: true,
      };

    case GET_USER_ONLOAD:
      return {
        ...state,
        user: {
          name: action.name,
          email: action.email,
        },
        isLogin: true,
        loginCheck: true,
      };

    case GET_USERINFO:
      return {
        ...state,
        user: {
          name: action.name,
          email: action.email,
        },
        isLogin: true,
        loginCheck: true,
      };

    case LOGOUT:
      return {
        ...state,
        isLogin: false,
        user: {
          email: "",
          name: "",
        },
        accessToken: "",
        refreshToken: "",
        loginCheck: true,
      };

    case AUTH_FAILED:
      return {
        ...state,
        isLogin: false,
        loginCheck: true,
      };

    case GET_USER_ONLOAD:
      return {
        ...state,
        user: {
          email: action.name,
          name: action.email,
        },
        isLogin: true,
        loginCheck: true,
      };

    case LOGIN_FAILED:
      return {
        ...state,
        loginFailed: true,
        loginCheck: false,
      };

    default:
      return state;
  }
};

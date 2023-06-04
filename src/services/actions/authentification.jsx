import {
  checkUserInfo,
  getAuthCoockie,
  requestLogin,
  requestLogout,
  requestRegistrationNewUser,
  requestUserInfoChange,
} from "../Api/api";
import { getCookie } from "../Coockie/getCookie";
import { setCookie } from "../Coockie/setCookie";

export const GET_USER_ONLOAD = "GET_USER_ONLOAD";
export const LOGIN = "LOGIN";
export const GET_USERINFO = "GET_USERINFO";
export const LOGOUT = "LOGOUT";
export const REGISTRATION = "REGISTRATION";
export const GET_TOKEN_ONLOAD = "GET_TOKEN_ONLOAD";
export const AUTH_FAILED = "AUTH_FAILED";
export const SET_USERINFO = "SET_USERINFO";

export const authUserOnLoad = () => {
  return function (dispatch) {
    getAuthCoockie()
      .then(
        (res) => (
          setCookie("refreshToken", res.refreshToken),
          setCookie("accessToken", res.accessToken),
          dispatch({
            type: GET_TOKEN_ONLOAD,
            accessToken: res.accessToken,
            refreshToken: res.refreshToken,
          }),
          checkUserInfo(res.accessToken).then((res) =>
            dispatch({
              type: GET_USER_ONLOAD,
              name: res.user.name,
              email: res.user.email,
            })
          )
        )
      )
      .catch(
        (error) => (
          console.log(error.message),
          dispatch({
            type: AUTH_FAILED,
          })
        )
      );
  };
};

export const handleRegistration = (name, email, password) => {
  return function (dispatch) {
    requestRegistrationNewUser(name, email, password).then((res) =>
      dispatch({
        type: REGISTRATION,
        name: res.user.name,
        email: res.user.email,
        accessToken: res.accessToken,
        refreshToken: res.refreshToken,
      })
    );
  };
};
export const checkLogin = (email, password) => {
  return function (dispatch) {
    requestLogin(email, password).then((res) => {
      setCookie("accessToken", res.accessToken);
      setCookie("refreshToken", res.refreshToken);
      dispatch({
        type: LOGIN,
        name: res.user.name,
        email: res.user.email,
        accessToken: res.accessToken,
        refreshToken: res.refreshToken,
      });
    });
  };
};
export const getUserInfo = () => {
  return function (dispatch) {
    checkUserInfo().then((res) =>
      dispatch({
        type: GET_USERINFO,
        name: res.user.name,
        email: res.user.email,
      })
    );
  };
};

export const setUserInfo = (email, name, password) => {
  return function (dispatch) {
    requestUserInfoChange(email, name, password).then((res) =>
      dispatch({
        type: SET_USERINFO,
        name: res.user.name,
        email: res.user.email,
      })
    );
  };
};

export const sendLogOut = () => {
  return function (dispatch) {
    document.cookie = "accessToken = 0; expires=-1";
    requestLogout().then((res) =>
      dispatch({
        type: LOGOUT,
      })
    );
  };
};

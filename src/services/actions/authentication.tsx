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
import { AppDispatch, AppThunk } from "../types/types";
export const GET_USER_ONLOAD: "GET_USER_ONLOAD" = "GET_USER_ONLOAD";
export const LOGIN: "LOGIN" = "LOGIN";
export const GET_USERINFO: "GET_USERINFO" = "GET_USERINFO";
export const LOGOUT: "LOGOUT" = "LOGOUT";
export const REGISTRATION: "REGISTRATION" = "REGISTRATION";
export const GET_TOKEN_ONLOAD: "GET_TOKEN_ONLOAD" = "GET_TOKEN_ONLOAD";
export const AUTH_FAILED: "AUTH_FAILED" = "AUTH_FAILED";
export const SET_USERINFO: "SET_USERINFO" = "SET_USERINFO";
export const LOGIN_FAILED: "LOGIN_FAILED" = "LOGIN_FAILED";

export const authUserOnLoad: AppThunk = (accessToken: string) => {
  return function (dispatch) {
    checkUserInfo()
      .then((res) =>
        dispatch({
          type: GET_USER_ONLOAD,
          name: res.user.name,
          email: res.user.email,
          loginCheck:true,    
        })
      )
      .catch(
        (error) => (
          console.log(error),
          getAuthCoockie().then(
            (res) => (
              setCookie("refreshToken", res.refreshToken, {
                expires: 99999999,
                path: "/",
              }),
              setCookie("accessToken", res.accessToken, {
                expires: 12000,
                path: "/",
              }),
              dispatch({
                type: GET_TOKEN_ONLOAD,
                accessToken: res.accessToken,
                refreshToken: res.refreshToken,
                loginCheck:true 
              }),
              console.log("аксес токен протух, я обновил")
            )
          )
        )
      )
      .catch((error) => console.log(error));
  };
};

export const refreshAcsesToken: AppThunk = () => {
  return function (dispatch: AppDispatch) {
    getAuthCoockie().then(
      (res) => (
        setCookie("refreshToken", res.refreshToken, {
          expires: 99999999,
          path: "/",
        }),
        setCookie("accessToken", res.accessToken, {
          expires: 12000,
          path: "/",
        }),
        dispatch({
          type: GET_TOKEN_ONLOAD,
          accessToken: res.accessToken,
          refreshToken: res.refreshToken,
          loginCheck:true 
        }),
        console.log("получил аксес токен")
      )
    );
  };
};

export const handleRegistration: AppThunk = (
  name: string,
  email: string,
  password: string
) => {
  return function (dispatch: AppDispatch) {
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
export const checkLogin: AppThunk = (
  email: string,
  password: string,
  name: string,
  accessToken: string,
  refreshToken: string
) => {
  return function (dispatch: AppDispatch) {
    setCookie("accessToken", accessToken, { expires: 12000 });
    setCookie("refreshToken", refreshToken, { expires: 12000 });
    dispatch({
      type: LOGIN,
      name: name,
      email: email,
      accessToken: accessToken,
      refreshToken: refreshToken,
      isLogin: true,
      loginCheck:true 
    });
  };
};

export const getUserInfo: AppThunk = () => {
  return function (dispatch: AppDispatch) {
    checkUserInfo().then((res) =>
      dispatch({
        type: GET_USERINFO,
        name: res.user.name,
        email: res.user.email,
      })
    );
  };
};

export const setUserInfo: AppThunk = (
  email: string,
  name: string,
  password: string
) => {
  return function (dispatch: AppDispatch) {
    requestUserInfoChange(email, name, password).then((res) =>
      dispatch({
        type: SET_USERINFO,
        name: res.user.name,
        email: res.user.email,
      })
    );
  };
};

export const sendLogOut: AppThunk = () => {
  return function (dispatch: AppDispatch) {
    document.cookie = "accessToken = 0; expires=-1";
    requestLogout().then((res) =>
      dispatch({
        type: LOGOUT,
        loginCheck:true 
      })
    );
  };
};

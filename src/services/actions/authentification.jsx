import {
  checkUserInfo,
  getAuthCoockie,
  requestLogin,
  requestLogout,
  requestRegistrationNewUser,
  requestUserInfoChange,
} from "../Api/api";
import { setCookie } from "../Coockie/setCookie";

export const GET_USER_ONLOAD = "GET_USER_ONLOAD";
export const LOGIN = "LOGIN";
export const GET_USERINFO = "GET_USERINFO";
export const LOGOUT = "LOGOUT";
export const REGISTRATION = "REGISTRATION";
export const GET_TOKEN_ONLOAD = "GET_TOKEN_ONLOAD";
export const AUTH_FAILED = "AUTH_FAILED";
export const SET_USERINFO = "SET_USERINFO";

export const authUserOnLoad = (accessToken) => {
  return function (dispatch) {
    checkUserInfo(accessToken)
    .then((res) =>
    (dispatch({
      type: GET_USER_ONLOAD,
      name: res.user.name,
      email: res.user.email,
    }),
    console.log("аксес токен жив"))
   )
   .catch((error) => (
    console.log(error),
    getAuthCoockie()
    .then(
      (res) => (
        setCookie("refreshToken", res.refreshToken, { expires: 99999999 }),
        setCookie("accessToken", res.accessToken, { expires: 12000 }),
        dispatch({
          type: GET_TOKEN_ONLOAD,
          accessToken: res.accessToken,
          refreshToken: res.refreshToken,
        }),
        console.log("аксес токен протух, я обновил")))
    ))
    .catch((error) => console.log(error))
  }}
  
  export const refreshAcsesToken = () => {
    return function (dispatch)
   {getAuthCoockie()
      .then((res) => (
          setCookie("refreshToken", res.refreshToken,{ expires: 99999999 } ),
          setCookie("accessToken", res.accessToken, { expires: 12000 }),
          dispatch({
            type: GET_TOKEN_ONLOAD,
            accessToken: res.accessToken,
            refreshToken: res.refreshToken,
          }),
          console.log("получил аксес токен")))}
  }
   
  


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
      setCookie("accessToken", res.accessToken, { expires: 12000 });
      setCookie("refreshToken", res.refreshToken, { expires: 12000 });
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

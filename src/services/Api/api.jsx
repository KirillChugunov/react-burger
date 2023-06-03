import { getCookie } from "../Coockie/getCookie";

export const config = {
  baseUrl: "https://norma.nomoreparties.space/api",
  headers: { "Content-Type": "application/json" },
};

export function checkResponse(res) {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`${res.status} - error`);
}

export const getIngredientsFromServer = () => request(`ingredients`);

export const sendOrderToServer = (newObj) =>
  request(`orders`, {
    method: "POST",
    headers: config.headers,
    body: JSON.stringify(newObj),
  });

function request(endpoint, options) {
  return fetch(`${config.baseUrl}/${endpoint}`, options).then(checkResponse);
}

export const resetPassword = (email) =>
  request("password-reset", {
    method: "POST",
    headers: config.headers,
    body: JSON.stringify({ email: email }),
  });

export const requestNewPassword = (password, token) =>
  request("password-reset/reset", {
    method: "POST",
    headers: config.headers,
    body: JSON.stringify({ password: password, token: token }),
  });

export const requestRegistrationNewUser = (name, email, password) =>
  request("auth/register", {
    method: "POST",
    headers: config.headers,
    body: JSON.stringify({
      email: `${email}`,
      password: `${password}`,
      name: `${name}`,
    }),
  });

export const requestLogin = (email, password) =>
  request("auth/login", {
    method: "POST",
    headers: config.headers,
    body: JSON.stringify({ email: email, password: password }),
  });

export const checkUserInfo = (token) =>
  request("auth/user", {
    headers: {
      Authorization: token,
    },
  });

export const getAuthCoockie = (token) =>
  request("auth/token", {
    method: "POST",
    headers: config.headers,
    body: JSON.stringify({ token: getCookie("refreshToken")}),
  });

export const requestLogout = (token) =>
  request("auth/logout", {
    method: "POST",
    headers: config.headers,
    body: JSON.stringify({ token: getCookie("refreshToken") }),
  });

export const requestUserInfoChange = (email, name, password) =>
  request("auth/user", {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      authorization: getCookie("accessToken"),
    },
    body: JSON.stringify({
      email: `${email}`,
      password: `${password}`,
      name: `${name}`,
    }),
  });

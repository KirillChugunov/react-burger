import { getCookie } from "../Coockie/getCookie";
import { TConfig } from "../types/types";

export const config = {
  baseUrl: "https://norma.nomoreparties.space/api",
  headers: { "Content-Type": "application/json" },
};

export const wsUrl = {
  all: "wss://norma.nomoreparties.space/orders/all",
  auth: "wss://norma.nomoreparties.space/orders?token=",
};

export const checkResponse = <T>(res: Response): Promise<T> => {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`${res.status} - error`);
};

export const getIngredientsFromServer = () => request(`ingredients`);

export const sendOrderToServer = (newObj: object):Promise<any>  =>
  request(`orders`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      authorization: getCookie("accessToken"),
    },
    body: JSON.stringify(newObj),
  });

export const request = (endpoint: string, options?: TConfig): Promise<any> => {
  return fetch(`${config.baseUrl}/${endpoint}`, options).then(checkResponse);
};

export const resetPassword = (email: string): Promise<any> =>
  request("password-reset", {
    method: "POST",
    headers: config.headers,
    body: JSON.stringify({ email: email }),
  });

export const requestNewPassword = (
  password: string,
  token: string
): Promise<any> =>
  request("password-reset/reset", {
    method: "POST",
    headers: config.headers,
    body: JSON.stringify({ password: password, token: token }),
  });

export const requestRegistrationNewUser = (
  name: string,
  email: string,
  password: string
): Promise<any> =>
  request("auth/register", {
    method: "POST",
    headers: config.headers,
    body: JSON.stringify({
      email: `${email}`,
      password: `${password}`,
      name: `${name}`,
    }),
  });

export const requestLogin = (email: string, password: string): Promise<any> =>
  request("auth/login", {
    method: "POST",
    headers: config.headers,
    body: JSON.stringify({ email: email, password: password }),
  });

export const checkUserInfo = (): Promise<any> =>
  request("auth/user", {
    headers: {
      "Content-Type": "application/json",
      authorization: getCookie("accessToken"),
    },
  });

export const getAuthCoockie = (): Promise<any> =>
  request("auth/token", {
    method: "POST",
    headers: config.headers,
    body: JSON.stringify({ token: getCookie("refreshToken") }),
  });

export const requestLogout = (): Promise<any> =>
  request("auth/logout", {
    method: "POST",
    headers: config.headers,
    body: JSON.stringify({ token: getCookie("refreshToken") }),
  });

export const requestUserInfoChange = (
  email: string,
  name: string,
  password: string
): Promise<any> =>
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

import * as types from "../actions/authentication";
import { authentication, initialState } from "./authentication";

describe("authentication reducer", () => {
  it("should return the initial state", () => {
    expect(authentication(initialState, {})).toEqual(initialState);
  });

  it("should handle REGISTRATION", () => {
    expect(
      authentication(initialState, {
        type: types.REGISTRATION,
        name: "testname",
        email: "testemail",
        accessToken: "testAcsessToken",
        refreshToken: "testrefreshToken",
        isLogin: true,
        loginCheck: true,
        loginFailed: false,
      })
    ).toEqual({
      isLogin: false,
      user: {
        name: "testname",
        email: "testemail",
      },
      accessToken: "testAcsessToken",
      refreshToken: "testrefreshToken",
      isLogin: true,
      loginCheck: true,
      loginFailed: false,
    });
  });

  it("should handle LOGIN", () => {
    expect(
      authentication(initialState, {
        type: types.LOGIN,
        name: "testname",
        email: "testemail",
        accessToken: "testAcsessToken",
        refreshToken: "testrefreshToken",
        isLogin: true,
      })
    ).toEqual({
      user: {
        name: "testname",
        email: "testemail",
      },
      accessToken: "testAcsessToken",
      refreshToken: "testrefreshToken",
      isLogin: true,
      loginCheck: true,
      loginFailed: false,
    });
  });

  it("should handle GET_TOKEN_ONLOAD", () => {
    expect(
      authentication(initialState, {
        type: types.GET_TOKEN_ONLOAD,
        accessToken: "testAcsessToken",
        refreshToken: "testrefreshToken",
        isLogin: true,
        loginCheck: false,
      })
    ).toEqual({
      isLogin: false,
      accessToken: "testAcsessToken",
      refreshToken: "testrefreshToken",
      isLogin: true,
      loginCheck: false,
      user: {
        email: "",
        name: "",
      },
      loginFailed: false,
    });
  });

  it("should handle GET_USER_ONLOAD", () => {
    expect(
      authentication(initialState, {
        type: types.GET_USER_ONLOAD,
        name: "testname",
        email: "testemail",
        isLogin: true,
        loginCheck: true,
      })
    ).toEqual({
      accessToken: "",
      refreshToken: "",
      loginFailed: false,
      user: {
        name: "testname",
        email: "testemail",
      },
      isLogin: true,
      loginCheck: true,
      loginFailed: false,
    });
  });

  it("should handle GET_USERINFO", () => {
    expect(
      authentication(initialState, {
        type: types.GET_USERINFO,
        name: "testname",
        email: "testemail",
        isLogin: true,
        loginCheck: true,
      })
    ).toEqual({
      user: {
        name: "testname",
        email: "testemail",
      },
      isLogin: true,
      loginCheck: true,
      accessToken: "",
      refreshToken: "",
      loginFailed: false,
    });
  });

  it("should handle LOGOUT", () => {
    expect(
      authentication(initialState, {
        type: types.LOGOUT,
      })
    ).toEqual({
      isLogin: false,
      user: {
        email: "",
        name: "",
      },
      accessToken: "",
      refreshToken: "",
      loginCheck: false,
      loginFailed: false,
    });
  });

  it("should handle AUTH_FAILED", () => {
    expect(
      authentication(initialState, {
        type: types.AUTH_FAILED,
      })
    ).toEqual({
      isLogin: false,
      user: {
        email: "",
        name: "",
      },
      accessToken: "",
      refreshToken: "",
      loginCheck: true,
      loginFailed: false,
    });
  });

  it("should handle GET_USER_ONLOAD", () => {
    expect(
      authentication(initialState, {
        type: types.GET_USER_ONLOAD,
        isLogin: true,
        loginCheck: true,
        name: "testname",
        email: "testemail",
      })
    ).toEqual({
      user: {
        name: "testname",
        email: "testemail",
      },
      isLogin: true,
      loginCheck: true,
      accessToken: "",
      refreshToken: "",
      loginCheck: true,
      loginFailed: false,
    });
  });
});

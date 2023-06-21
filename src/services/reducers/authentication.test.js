import * as types from "../actions/authentication";
import { refreshToken, testAcsessToken, testEmail, testName } from "../hardcodefortests";
import { authentication, initialState } from "./authentication";


describe("authentication reducer", () => {
  it("should return the initial state", () => {
    expect(authentication(undefined, {})).toEqual(initialState);
  });

  it("should handle REGISTRATION", () => {
    expect(
      authentication(initialState, {
        type: types.REGISTRATION,
        name: testName,
        email: testEmail,
        accessToken: testAcsessToken,
        refreshToken: refreshToken,
        isLogin: true,
        loginCheck: true,
        loginFailed: false,
      })
    ).toEqual({
      ...initialState,
      user: {
        name: testName,
        email: testEmail,
      },
      accessToken: testAcsessToken,
      refreshToken: refreshToken,
      isLogin: true,
      loginCheck: true,
     });
  });

  it("should handle LOGIN", () => {
    expect(
      authentication(initialState, {
        type: types.LOGIN,
        name: testName,
        email: testEmail,
        accessToken: testAcsessToken,
        refreshToken: refreshToken,
        isLogin: true,
        loginCheck: true,
      })
    ).toEqual({
      ...initialState,
      user: {
        name: testName,
        email: testEmail,
      },
      accessToken: testAcsessToken,
      refreshToken: refreshToken,
      isLogin: true,
      loginCheck: true,
      loginFailed: false,
    });
  });

  it("should handle GET_TOKEN_ONLOAD", () => {
    expect(
      authentication(initialState, {
        type: types.GET_TOKEN_ONLOAD,
        accessToken: testAcsessToken,
        refreshToken: refreshToken,
        isLogin: true,
        loginCheck: false,
      })
    ).toEqual({
      ...initialState,
      accessToken: testAcsessToken,
      refreshToken: refreshToken,
      isLogin: true,
      loginCheck: true,
    });
  });

  it("should handle GET_USER_ONLOAD", () => {
    expect(
      authentication(initialState, {
        type: types.GET_USER_ONLOAD,
        name: testName,
        email: testEmail,
        isLogin: true,
        loginCheck: true,
      })
    ).toEqual({
      ...initialState,
      user: {
        name: testName,
        email: testEmail,
      },
      isLogin: true,
      loginCheck: true,
     });
  });

  it("should handle GET_USERINFO", () => {
    expect(
      authentication(initialState, {
        type: types.GET_USERINFO,
        name: testName,
        email: testEmail,
        isLogin: true,
        loginCheck: true,
      })
    ).toEqual({
      ...initialState,
      user: {
        name: testName,
        email: testEmail,
      },
      isLogin: true,
      loginCheck: true,
     });
  });

  it("should handle LOGOUT", () => {
    expect(
      authentication(initialState, {
        type: types.LOGOUT,
        loginCheck: true,
      })
    ).toEqual({
      ...initialState,
      isLogin: false,
      user: {
        email: "",
        name: "",
      },
      accessToken: "",
      refreshToken: "",
      loginCheck: true,
     });
  });

  it("should handle AUTH_FAILED", () => {
    expect(
      authentication(initialState, {
        type: types.AUTH_FAILED,
        loginCheck: true,
      })
    ).toEqual({
      ...initialState,
      isLogin: false,
      loginCheck: true,
    });
  });

  it("should handle GET_USER_ONLOAD", () => {
    expect(
      authentication(initialState, {
        type: types.GET_USER_ONLOAD,
        isLogin: true,
        loginCheck: true,
        name: testName,
        email: testEmail,
      })
    ).toEqual({
      ...initialState,
      user: {
        name: testName,
        email: testEmail,
      },
      isLogin: true,
      loginCheck: true,
    });
  });

  it("should handle LOGIN_FAILED", () => {
    expect(
      authentication(initialState, {
        type: types.LOGIN_FAILED,
      })
    ).toEqual({
      ...initialState,
      loginFailed: true,
      loginCheck: false,
    });
  });
});

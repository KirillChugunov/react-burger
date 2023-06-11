import * as types from "../actions/authentification"
import { authentification } from './authentification'

describe('authentification reducer', () => {
  it('should return the initial state', () => {
    expect(authentification(undefined, {})).toEqual(
      {
        isLogin: false,
        user: {
          email: "",
          name: "",
        },
        accessToken: "",
        refreshToken: "",
        logginCheck: false,
      }
    )
  })

  it('should handle REGISTRATION', () => {
    expect(
      authentification([], {
        type: types.REGISTRATION,
        name: "testname",
        email: "testemail",
        accessToken: "testAcsessToken",
        refreshToken: "testrefreshToken",
        isLogin: true,
        logginCheck: true,
      })
    ).toEqual(
      {
        isLogin: false,
        user: {
          name: "testname",
          email: "testemail"
        },
        accessToken: "testAcsessToken",
        refreshToken: "testrefreshToken",
        isLogin: true,
        logginCheck: true
      }
    )
  })

  it('should handle LOGIN', () => {
    expect(
      authentification([], {
        type: types.LOGIN,
        name: "testname",
        email: "testemail",
        accessToken: "testAcsessToken",
        refreshToken: "testrefreshToken",
        isLogin: true,
        logginCheck: true,
      })
    ).toEqual(
      {
        isLogin: false,
        user: {
          name: "testname",
          email: "testemail"
        },
        accessToken: "testAcsessToken",
        refreshToken: "testrefreshToken",
        isLogin: true,
        logginCheck: true
      }
    )
  })

  it('should handle GET_TOKEN_ONLOAD', () => {
    expect(
      authentification([], {
        type: types.GET_TOKEN_ONLOAD,
         accessToken: "testAcsessToken",
        refreshToken: "testrefreshToken",
        isLogin: true,
        logginCheck: false,
      })
    ).toEqual(
      {
        isLogin: false,
        accessToken: "testAcsessToken",
        refreshToken: "testrefreshToken",
        isLogin: true,
        logginCheck: false
      }
    )
  })

  it('should handle GET_USER_ONLOAD', () => {
    expect(
      authentification([], {
        type: types.GET_USER_ONLOAD,
        name: "testname",
        email: "testemail",
        isLogin: true,
        logginCheck: true,
      })
    ).toEqual(
      {
        user: {
          name: "testname",
          email: "testemail"
        },
        isLogin: true,
        logginCheck: true
      }
    )
  })

  it('should handle GET_USERINFO', () => {
    expect(
      authentification([], {
        type: types.GET_USERINFO,
        name: "testname",
        email: "testemail",
        isLogin: true,
        logginCheck: true,
      })
    ).toEqual(
      {
        user: {
          name: "testname",
          email: "testemail"
        },
        isLogin: true,
        logginCheck: true
      }
    )
  })

  it('should handle LOGOUT', () => {
    expect(
      authentification([], {
        type: types.LOGOUT,
      })
    ).toEqual(
      {
        user: {
          name: "",
          email: ""
        },
        accessToken: "",
        refreshToken: "",
        isLogin: false,
        logginCheck: false
      }
    )
  })

  it('should handle AUTH_FAILED', () => {
    expect(
      authentification([], {
        type: types.AUTH_FAILED,
      })
    ).toEqual(
      {
        isLogin: false,
        logginCheck: true
      }
    )
  })

  it('should handle GET_USER_ONLOAD', () => {
    expect(
      authentification([], {
        type: types.GET_USER_ONLOAD,
        isLogin: true,
        logginCheck: true,
        name: "testname",
        email: "testemail",
      })
    ).toEqual(
      {
        isLogin: false,
        user: {
          name: "testname",
          email: "testemail"
        },
        isLogin: true,
        logginCheck: true
      }
    )
  })



})
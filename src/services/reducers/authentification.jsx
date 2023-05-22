import { AUTH_ERROR, GET_TOKEN_ONLOAD, GET_USERINFO, GET_USER_ONLOAD, LOGIN, LOGOUT, REGISTRATION } from "../actions/authentification";

const initialState = {
  isLogin: false,
  user: {
    email: "",
    name: "",
  },
  accessToken: "",
  refreshToken: "",
  logginCheck:false
};

export const authentification = (state = initialState, action) => {
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
        logginCheck:true
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
        logginCheck:true
      };

      case GET_TOKEN_ONLOAD:
        return {
          ...state,
          accessToken: action.accessToken,
          refreshToken: action.refreshToken,
          isLogin: false,
          logginCheck:false,
        };

        case GET_USER_ONLOAD:
          return {
            ...state,
            user: {
              name: action.name,
              email: action.email,
            },
            isLogin: true,
            logginCheck:true
          };
  

    case GET_USERINFO:
      return {
        ...state,
      user: {
          name: action.name,
          email: action.email,
        },
        isLogin: true,
        logginCheck:true
      };

    case LOGOUT:
      return {
        ...state,
        isLogin: false,
        logginCheck:false      
      };

    case AUTH_ERROR:
         return {
          ...state,
          isLogin: false,
          logginCheck:true      
        };

    default:
      return state;
  }
};

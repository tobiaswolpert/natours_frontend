import { USER_ACTION_TYPES } from "./user.types";

const INITIAL_STATE = {
  isLoggedIn: false,
  isLoading: false,
  token: "",
  tokenExpirationDate: "",
  details: "",
  status: "",
};

export const userReducer = (state = INITIAL_STATE, action) => {
  const { type, payload } = action;

  switch (type) {
    case USER_ACTION_TYPES.LOGIN_USER_START:
      return { ...state, isLoading: true };

    case USER_ACTION_TYPES.LOGIN_USER_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isLoggedIn: true,
        token: payload.token,
        tokenExpirationDate: new Date(
          new Date().getTime() + 1 * 1000 * 60 * 20
        ).toISOString(),
        status: payload.status,
        details: payload.data.user,
      };

    case USER_ACTION_TYPES.LOGIN_USER_FAILURE:
      return {
        ...state,
        isLoading: false,
        isLoggedIn: false,
        status: payload.message,
        token: "",
        tokenExpirationDate: "",
        details: "",
      };

    case USER_ACTION_TYPES.SIGNUP_USER_START:
      return { ...state, isLoading: true };

    case USER_ACTION_TYPES.SIGNUP_USER_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isLoggedIn: true,
        token: payload.token,
        tokenExpirationDate: new Date(
          new Date().getTime() + 1 * 1000 * 60 * 20
        ).toISOString(),
        status: payload.status,
        details: payload.data.user,
      };

    case USER_ACTION_TYPES.SIGNUP_USER_FAILURE:
      return {
        ...state,
        isLoading: false,
        isLoggedIn: false,
        status: payload.message,
        token: "",
        tokenExpirationDate: "",
        details: "",
      };

    case USER_ACTION_TYPES.UPDATE_SETTINGS_START:
      return { ...state, isLoading: true };

    case USER_ACTION_TYPES.UPDATE_SETTINGS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        details: payload.data.user,
      };

    case USER_ACTION_TYPES.UPDATE_SETTINGS_FAILURE:
      return { ...state, isLoading: false };

    case USER_ACTION_TYPES.LOGOUT_USER:
      return { ...INITIAL_STATE };

    default:
      return state;
  }
};

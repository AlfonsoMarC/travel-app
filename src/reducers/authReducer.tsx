import { ACTION_TYPES } from "types/types";
import { Action, LoginValues, SignUpValues } from "actions/auth";

export type State = {
  loading?: boolean;
  renewLoading?: boolean;
  isLooggedIn?: boolean;
  uid?: string;
  name?: string;
  error?: any;
  loginValues?: LoginValues;
  signUpValues?: SignUpValues;
};

const initialState: State = {
  loading: false,
  renewLoading: true
};

const authReducer = (state: State = initialState, action: Action) => {
  switch (action.type) {
    case ACTION_TYPES.AUTH_LOGIN_REQUEST:
      return {
        ...state,
        loading: true
      };

    case ACTION_TYPES.AUTH_LOGIN_SUCCESS:
      return {
        ...state,
        ...action.payload,
        loading: false
      };
    case ACTION_TYPES.AUTH_LOGIN_FAILURE:
      return {
        ...state,
        ...action.payload,
        loading: false
      };
    case ACTION_TYPES.AUTH_SIGNUP_REQUEST:
      return {
        ...state,
        loading: true
      };

    case ACTION_TYPES.AUTH_SIGNUP_SUCCESS:
      return {
        ...state,
        ...action.payload,
        loading: false
      };
    case ACTION_TYPES.AUTH_SIGNUP_FAILURE:
      return {
        ...state,
        ...action.payload,
        loading: false
      };
    case ACTION_TYPES.AUTH_RENEW_REQUEST:
      return {
        ...state,
        renewLoading: true
      };
    case ACTION_TYPES.AUTH_RENEW_SUCCESS:
      return {
        ...state,
        ...action.payload,
        renewLoading: false
      };
    case ACTION_TYPES.AUTH_RENEW_FAILURE:
      return {
        ...state,
        renewLoading: false
      };
    case ACTION_TYPES.AUTH_LOGOUT:
      return {};

    default:
      return state;
  }
};

export default authReducer;

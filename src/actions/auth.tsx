import { Dispatch } from "react";
import { ACTION_TYPES, ActionTypes, User } from "types/types";
import { fetchWithoutToken, fetchWithToken } from "helpers/fetch";

export interface LoginValues {
  email: string;
  password: string;
}

export interface SignUpValues {
  email: string;
  name: string;
  password: string;
}
type Payload =
  | { uid: string; name: string }
  | { error: any; values: LoginValues | SignUpValues };

export interface Action {
  type: ActionTypes;
  payload?: Payload;
}

const loginRequestAction = () => ({
  type: ACTION_TYPES.AUTH_LOGIN_REQUEST
});

const loginSuccessAction = (user: User) => ({
  type: ACTION_TYPES.AUTH_LOGIN_SUCCESS,
  payload: user
});

const loginFailureAction = (error: any) => ({
  type: ACTION_TYPES.AUTH_LOGIN_FAILURE,
  payload: error
});

const signUpRequestAction = () => ({
  type: ACTION_TYPES.AUTH_SIGNUP_REQUEST
});

const signUpSuccessAction = (user: User) => ({
  type: ACTION_TYPES.AUTH_SIGNUP_SUCCESS,
  payload: user
});

const signUpFailureAction = (error: any) => ({
  type: ACTION_TYPES.AUTH_SIGNUP_FAILURE,
  payload: error
});

const renewTokenRequestAction = () => ({
  type: ACTION_TYPES.AUTH_RENEW_REQUEST
});

const renewTokenSuccessAction = (user: User) => ({
  type: ACTION_TYPES.AUTH_RENEW_SUCCESS,
  payload: user
});

const renewTokenFailureAction = () => ({
  type: ACTION_TYPES.AUTH_RENEW_FAILURE
});

const logoutAction = () => ({
  type: ACTION_TYPES.AUTH_LOGOUT
});

export const login = (email: string, password: string) => {
  return async (dispatch: Dispatch<Action>) => {
    dispatch(loginRequestAction());
    try {
      const resp = await fetchWithoutToken({
        endpoint: "auth",
        body: { email, password },
        method: "POST"
      });
      const body = await resp.json();

      if (!body.error) {
        localStorage.setItem("token", body.token);
        localStorage.setItem("token-init-date", String(new Date().getTime()));

        dispatch(
          loginSuccessAction({
            uid: body.uid,
            name: body.name
          })
        );
      } else {
        dispatch(
          loginFailureAction({
            error: body.error,
            loginValues: { email, password }
          })
        );
      }
    } catch {
      dispatch(
        loginFailureAction({
          error: "There was an error",
          loginValues: { email, password }
        })
      );
    }
  };
};

export const signUp = (email: string, name: string, password: string) => {
  return async (dispatch: Dispatch<Action>) => {
    dispatch(signUpRequestAction());
    try {
      const resp = await fetchWithoutToken({
        endpoint: "auth/new",
        body: { email, name, password },
        method: "POST"
      });
      const body = await resp.json();

      if (!body.error) {
        localStorage.setItem("token", body.token);
        localStorage.setItem("token-init-date", String(new Date().getTime()));

        dispatch(
          signUpSuccessAction({
            uid: body.uid,
            name: body.name
          })
        );
      } else {
        dispatch(
          signUpFailureAction({
            error: body.error,
            signUpValues: { email, name, password }
          })
        );
      }
    } catch (error) {
      dispatch(
        signUpFailureAction({
          error,
          signUpValues: {
            email,
            name,
            password
          }
        })
      );
    }
  };
};

export const renewToken = () => {
  return async (dispatch: Dispatch<Action>) => {
    dispatch(renewTokenRequestAction());
    try {
      const resp = await fetchWithToken({ endpoint: "auth/renew" });
      const body = await resp.json();
      if (!body.error) {
        localStorage.setItem("token", body.token);
        localStorage.setItem("token-init-date", String(new Date().getTime()));
        dispatch(
          renewTokenSuccessAction({
            uid: body.uid,
            name: body.name
          })
        );
      } else {
        dispatch(renewTokenFailureAction());
      }
    } catch {
      dispatch(renewTokenFailureAction());
    }
  };
};

export const logout = () => {
  return (dispatch: Dispatch<Action>) => {
    localStorage.clear();
    dispatch(logoutAction());
  };
};

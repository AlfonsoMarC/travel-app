/* REDUX */
export const ACTION_TYPES = {
  AUTH_LOGIN_REQUEST: "AUTH_LOGIN_REQUEST",
  AUTH_LOGIN_SUCCESS: "AUTH_LOGIN_SUCCESS",
  AUTH_LOGIN_FAILURE: "AUTH_LOGIN_FAILURE",

  AUTH_SIGNUP_REQUEST: "AUTH_SIGNUP_REQUEST",
  AUTH_SIGNUP_SUCCESS: "AUTH_SIGNUP_SUCCESS",
  AUTH_SIGNUP_FAILURE: "AUTH_SIGNUP_FAILURE",

  AUTH_RENEW_REQUEST: "AUTH_RENEW_REQUEST",
  AUTH_RENEW_SUCCESS: "AUTH_RENEW_SUCCESS",
  AUTH_RENEW_FAILURE: "AUTH_RENEW_FAILURE",

  AUTH_LOGOUT: "AUTH_LOGOUT",

  TRIPS_CREATE_REQUEST: "TRIPS_CREATE_REQUEST",
  TRIPS_CREATE_SUCCESS: "TRIPS_CREATE_SUCCESS",
  TRIPS_CREATE_FAILURE: "TRIPS_CREATE_FAILURE"
} as const;
export type ActionTypes = typeof ACTION_TYPES[keyof typeof ACTION_TYPES];

/* METHODS */
export const METHODS = {
  GET: "GET",
  POST: "POST",
  PUT: "PUT",
  DELETE: "DELETE"
} as const;
export type Methods = typeof METHODS[keyof typeof METHODS];

/* MODELS */
export interface User {
  uid: string;
  name: string;
}

export interface Post {
  _id: string;
  img: string;
  title?: string;
  comment?: string;
  location?: string;
  trip?: string;
}

export interface PostPayload {
  files: File[];
  location?: string;
  trip?: string;
}

export interface Location {
  _id: string;
  name: string;
  coordinates?: number[];
  trip?: string;
}

export interface LocationPayload {
  name: string;
  coordinates?: number[];
  trip?: string;
}

export interface Trip {
  _id: string;
  title: string;
  startDate: string;
  endDate: string;
  description?: string;
  uid?: string;
  posts?: Post[];
  locations?: Location[];
}

export interface TripPayload {
  title: string;
  startDate: Date;
  endDate: Date;
  description?: string;
}

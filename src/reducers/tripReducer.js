import { ACTION_TYPES } from "types/types";

const initialState = {
  loading: false
};

const tripReducer = (state = initialState, action) => {
  switch (action.type) {
    case ACTION_TYPES.TRIPS_CREATE_REQUEST:
      return {
        ...state,
        loading: true
      };

    case ACTION_TYPES.TRIPS_CREATE_SUCCESS:
      return {
        ...state,
        ...action.payload,
        loading: false
      };
    case ACTION_TYPES.TRIPS_CREATE_FAILURE:
      return {
        ...state,
        ...action.payload,
        loading: false
      };

    default:
      return state;
  }
};

export default tripReducer;

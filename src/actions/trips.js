/* import { ACTION_TYPES } from "types";
import { fetchWithToken } from "helpers/fetch";

const createTripRequestAction = () => ({
  type: ACTION_TYPES.TRIPS_CREATE_REQUEST
});

const createTripSuccessAction = trip => ({
  type: ACTION_TYPES.TRIPS_CREATE_SUCCESS,
  payload: trip
});

const createTripFailureAction = msg => ({
  type: ACTION_TYPES.TRIPS_CREATE_FAILURE,
  payload: msg
});

export const createTrip = trip => {
  return async dispatch => {
    dispatch(createTripRequestAction());
    try {
      const resp = await fetchWithToken({
        endpoint: "trips",
        body: trip,
        method: "POST"
      });
      const body = await resp.json();

      if (body.ok) {
        dispatch(createTripSuccessAction(body.trip));
      } else {
        dispatch(
          createTripFailureAction({
            msg: body.msg
          })
        );
      }
    } catch {
      dispatch(
        createTripFailureAction({
          msg: "There was an error"
        })
      );
    }
  };
};
 */

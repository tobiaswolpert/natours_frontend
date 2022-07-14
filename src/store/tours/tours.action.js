import { TOURS_ACTION_TYPES } from "./tours.types";

export const fetchToursStart = () => {
  return { type: TOURS_ACTION_TYPES.FETCH_TOURS_START };
};

export const fetchToursSuccess = (toursData) => {
  return { type: TOURS_ACTION_TYPES.FETCH_TOURS_SUCCESS, payload: toursData };
};

export const fetchToursFailure = (error) => {
  return { type: TOURS_ACTION_TYPES.FETCH_TOURS_FAILURE, payload: error };
};

export const fetchToursAsync = () => async (dispatch) => {
  dispatch(fetchToursStart());
  try {
    const response = await fetch(
      `${process.env.REACT_APP_BACKEND_URL}/api/v1/tours`
    );
    const tours = await response.json();
    dispatch(fetchToursSuccess(tours.data.doc));
  } catch (error) {
    dispatch(fetchToursFailure(error));
  }
};

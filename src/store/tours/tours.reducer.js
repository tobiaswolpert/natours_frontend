import { TOURS_ACTION_TYPES } from "./tours.types";

const TOURS_INITIAL_STATE = {
  tours: [],
  isLoading: false,
  error: null,
};

export const toursReducer = (state = TOURS_INITIAL_STATE, action = {}) => {
  const { type, payload } = action;

  switch (type) {
    case TOURS_ACTION_TYPES.FETCH_TOURS_START:
      return { ...state, isLoading: true };

    case TOURS_ACTION_TYPES.FETCH_TOURS_SUCCESS:
      return { ...state, tours: payload, isLoading: false };

    case TOURS_ACTION_TYPES.FETCH_TOURS_FAILURE:
      return { ...state, error: payload, isLoading: false };

    default:
      return state;
  }
};

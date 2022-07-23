import { createSelector } from "reselect";

const selectToursReducer = (state) => {
  return state.tours;
};

export const selectToursIsLoading = createSelector(
  [selectToursReducer],
  (toursSlice) => toursSlice.isLoading
);

export const selectError = createSelector(
  [selectToursReducer],
  (toursSlice) => toursSlice.error
);

export const selectToursMap = createSelector(
  [selectToursReducer],
  (toursSlice) => toursSlice.tours
);

export const selectTour = createSelector(
  [selectToursReducer, (state, tour) => tour],
  (toursSlice, tour) =>
    toursSlice.tours.filter((element) => element.slug === tour)
);

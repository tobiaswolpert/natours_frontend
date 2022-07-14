import { createSelector } from "reselect";

const selectUserReducer = (state) => {
  return state.user;
};

export const selectUserIsLoading = createSelector(
  [selectUserReducer],
  (userSlice) => userSlice.isLoading
);

export const selectUserStatus = createSelector(
  [selectUserReducer],
  (userSlice) => userSlice.status
);

export const selectUserIsLoggedIn = createSelector(
  [selectUserReducer],
  (userSlice) => userSlice.isLoggedIn
);

export const selectUserToken = createSelector(
  [selectUserReducer],
  (userSlice) => userSlice.token
);

export const selectTokenExpiration = createSelector(
  [selectUserReducer],
  (userSlice) => userSlice.tokenExpirationDate
);

export const selectUserDetails = createSelector(
  [selectUserReducer],
  (userSlice) => userSlice.details
);

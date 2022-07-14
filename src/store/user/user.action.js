import { USER_ACTION_TYPES } from "./user.types";

export const loginUserStart = () => {
  return { type: USER_ACTION_TYPES.LOGIN_USER_START };
};

export const loginUserSuccess = (userData) => {
  return { type: USER_ACTION_TYPES.LOGIN_USER_SUCCESS, payload: userData };
};

export const loginUserFailure = (error) => {
  return { type: USER_ACTION_TYPES.LOGIN_USER_FAILURE, payload: error };
};

export const logoutUser = () => {
  return { type: USER_ACTION_TYPES.LOGOUT_USER };
};

export const updateSettingsStart = () => {
  return { type: USER_ACTION_TYPES.UPDATE_SETTINGS_START };
};

export const updateSettingsSuccess = (userData) => {
  return { type: USER_ACTION_TYPES.UPDATE_SETTINGS_SUCCESS, payload: userData };
};

export const updateSettingsFailure = (error) => {
  return { type: USER_ACTION_TYPES.UPDATE_SETTINGS_FAILURE, payload: error };
};

export const loginUserAsync = (data) => async (dispatch) => {
  dispatch(loginUserStart());
  try {
    const res = await fetch(
      `${process.env.REACT_APP_BACKEND_URL}/api/v1/users/login`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      }
    );
    const responseData = await res.json();
    if (responseData.error) {
      throw new Error(responseData.message);
    }

    if (responseData.status === "success") {
      // alert("User logged in successfully!");
    }
    dispatch(loginUserSuccess(responseData));
  } catch (error) {
    dispatch(loginUserFailure(error));
    // alert(error.message);
  }
};

export const updateSettingsAsync = (data, token, type) => async (dispatch) => {
  dispatch(updateSettingsStart());
  try {
    let url =
      type === "password"
        ? `${process.env.REACT_APP_BACKEND_URL}/api/v1/users/updateMyPassword`
        : `${process.env.REACT_APP_BACKEND_URL}/api/v1/users/updateMe`;

    const res = await fetch(url, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify(data),
    });
    const responseData = await res.json();

    if (responseData.status === "success") {
      alert(`${type} changed successfully`);
    }
    type === "password"
      ? dispatch(loginUserSuccess(responseData))
      : dispatch(updateSettingsSuccess(responseData));
  } catch (err) {
    dispatch(updateSettingsFailure(err));
  }
};

import { ADD_USER, LOGOUT_USER } from "./keys";

export const updateUser = (dispatch) => (user) => {
  dispatch({
    type: ADD_USER,
    payload: { ...user },
  });
};

export const logoutUser = (dispatch) => () => {
  dispatch({
    type: LOGOUT_USER,
    payload: {},
  });
};

import userInstance from "../../axios/userInstance";
import {
  SIGN_IN_SUCCESS,
  SIGN_UP_SUCCESS,
  SIGN_OUT_SUCCESS,
  LOAD_PROFILE_SUCCESS,
} from "../action-types";
import { saveToken, deleteToken } from "../localStorage";

export const signIn = (formValues) => {
  const { email, password } = formValues;

  return async (dispatch) => {
    const loginResponse = await userInstance.post("/login", {
      email,
      password,
    });
    saveToken(loginResponse.data.data.token);
    dispatch({ type: SIGN_IN_SUCCESS, payload: loginResponse.data.data });
  };
};

export const signUp = (formValues) => {
  const { firstName, lastName, email, password } = formValues;
  console.log(formValues);
  return async (dispatch) => {
    const registrationResponse = await userInstance.post("/register", {
      firstName,
      lastName,
      email,
      password,
    });

    saveToken(registrationResponse.data.data.token);
    dispatch({
      type: SIGN_UP_SUCCESS,
      payload: registrationResponse.data.data,
    });
  };
};

export const loadProfile = (token) => {
  return async (dispatch) => {
    try {
      const loadProfileResponse = await userInstance.get("/get-profile", {
        headers: {
          "x-access-token": token,
        },
      });
      dispatch({
        type: LOAD_PROFILE_SUCCESS,
        payload: loadProfileResponse.data.data,
      });
    } catch (error) {
      return error;
    }
  };
};

export const signOut = () => {
  deleteToken();
  return { type: SIGN_OUT_SUCCESS };
};

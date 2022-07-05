import {
  SIGN_IN_SUCCESS,
  SIGN_UP_SUCCESS,
  SIGN_OUT_SUCCESS,
  LOAD_PROFILE_SUCCESS,
} from "../action-types";

const INITIAL_STATE = {
  isSignedIn: false,
  userID: "",
  name: "",
  email: "",
};

const authReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SIGN_IN_SUCCESS:
      return {
        ...state,
        isSignedIn: true,
        name: action.payload.name,
        userID: action.payload._id,
        email: action.payload.email,
      };
    case SIGN_UP_SUCCESS:
      return {
        ...state,
        isSignedIn: true,
        name: action.payload.name,
        userID: action.payload._id,
        email: action.payload.email,
      };
    case LOAD_PROFILE_SUCCESS:
      return {
        ...state,
        isSignedIn: true,
        name: action.payload.name,
        userID: action.payload._id,
        email: action.payload.email,
      };
    case SIGN_OUT_SUCCESS:
      return {
        ...state,
        isSignedIn: false,
        firstName: "",
        lastName: "",
        userID: "",
        gender: "",
        email: "",
        role: "",
      };
    default:
      return { ...state };
  }
};

export default authReducer;

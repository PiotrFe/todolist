import { SignInSignUpTypes } from "./sign-in-sign-up-page.types";

const {
  SIGN_IN_SUCCESS,
  SIGN_IN_FAILURE,
  SIGN_UP_SUCCESS,
  SIGN_UP_FAILURE,
  SIGN_OUT_SUCCESS,
  SIGN_OUT_FAILURE,
} = SignInSignUpTypes;

const INITIAL_STATE = {
  authenticated: false,
  error: null,
};

const SignInSignUpReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SIGN_IN_SUCCESS: 
    case SIGN_UP_SUCCESS:
      return {
        ...state,
        authenticated: true,
        error: null,
      };
    case SIGN_IN_FAILURE:
    case SIGN_UP_FAILURE:
      return {
        ...state,
        authenticated: false,
        error: action.payload,
      };
    case SIGN_OUT_SUCCESS:
      return {
        ...state,
        authenticated: false,
        error: null,
      };
    case SIGN_OUT_FAILURE:
      return {
        ...state,
        authenticated: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default SignInSignUpReducer;

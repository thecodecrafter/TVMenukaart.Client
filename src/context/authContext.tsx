import { NavigateFunction } from "react-router-dom";
import { AccountService } from "../service/AccountService";
import createDataContext from "./createDataContext";
import { ProblemDetails } from "../client/MenuMaster.Client.Generated";

const authReducer = (state, action) => {
  switch (action.type) {
    case "add_error":
      console.log("Setting", action.payload)
      return { ...state, errorMessage: action.payload };
    case "signin":
      return { errorMessage: "", token: action.payload };
    case "clear_error_message":
      return { ...state, errorMessage: "" };
    case "signout":
      return { token: null, errorMessage: "" };
    default:
      return state;
  }
};

const tryLocalSignin = (dispatch) => async () => {
  const token = await localStorage.getItemAsync("token");

  if (token) {
    dispatch({ type: "signin", payload: token });
  } else {
    // router.replace("/deviceCode");
  }
};

const clearErrorMessage = (dispatch) => () => {
  dispatch({ type: "clear_error_message" });
};

const signin = (dispatch) => {
  return async ({ username, password }, navigate: NavigateFunction) => {
    try {
      const accountService = new AccountService(
        import.meta.env.VITE_baseApiUrl
      );

      const response = await accountService.login(username, password);

      localStorage.setItem("token", response.token);
      localStorage.setItem("user", JSON.stringify(response));
      dispatch({
        type: "signin",
        payload: response.token,
      });

      navigate("/admin/restaurants");
    } catch (err: unknown) {
      const error = err as ProblemDetails;
      dispatch({
        type: "add_error",
        payload:
          "Please try again: " + error.title
      });
    }
  };
};

const signout = (dispatch) => {
  return async (navigate: NavigateFunction) => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    dispatch({
      type: "signout",
    });

    navigate("/login");
  };
};

export const { Provider, Context } = createDataContext(
  authReducer,
  { signin, signout, clearErrorMessage, tryLocalSignin },
  { token: localStorage.getItem("token"), errorMessage: "" }
);

import { Navigate } from "react-router-dom";
let navigator;

export const setNavigator = (nav) => {
  navigator = nav;
};

export const navigate = (routeName) => {
  navigator.dispatch(Navigate({ to: routeName }));
};

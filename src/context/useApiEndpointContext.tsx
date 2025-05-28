import * as React from "react";

interface IApiEndpointContextProviderProps {
  value: string;
  children: React.ReactNode;
}

export const ApiEndpointContext = React.createContext<string>("");

export const useApiEndpointContext = () => React.useContext(ApiEndpointContext);

export const ApiEndpointContextProvider = (
  props: IApiEndpointContextProviderProps
) => (
  <ApiEndpointContext.Provider value={props.value}>
    {props.children}
  </ApiEndpointContext.Provider>
);

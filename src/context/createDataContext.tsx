import React, { useMemo, useReducer } from "react";

const DataContext = (reducer, actions, defaultValue) => {
  const Context = React.createContext(defaultValue);

  const Provider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, defaultValue);

    const boundActions = useMemo(() => {
      const actionsMap = {};
      for (const key in actions) {
        actionsMap[key] = actions[key](dispatch);
      }
      return actionsMap;
    }, [dispatch]);

    const providerObj = useMemo(
      () => ({ state, ...boundActions }),
      [state, boundActions]
    );
    return <Context.Provider value={providerObj}>{children}</Context.Provider>;
  };

  return { Context: Context, Provider: Provider };
};

export default DataContext;

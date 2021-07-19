import React from "react";
import { useLocalObservable } from "mobx-react";
import { createStateStore } from "./stateStore";

const StoreContext = React.createContext(null);

export const StoreProvider = ({ children }) => {
  const store = useLocalObservable(createStateStore);

  return (
    <StoreContext.Provider value={store}>{children}</StoreContext.Provider>
  );
};

export const useStore = () => React.useContext(StoreContext);

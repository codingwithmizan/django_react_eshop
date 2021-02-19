import React, { createContext, useContext, useReducer } from "react";

const Context = createContext();

export const Globalstate = ({ reducer, initialstate, children }) => {
  return (
    <Context.Provider value={useReducer(reducer, initialstate)}>
      {children}
    </Context.Provider>
  );
};

export const useGlobalState = () => useContext(Context);

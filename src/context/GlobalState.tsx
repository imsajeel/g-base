import React, { createContext, useReducer } from "react";
import {
  ADD_SITE_DATA,
  LOG_IN_USER,
  LOG_OUT_USER,
  RESET_SITE,
} from "./actionTypes";
import appReducer from "./appReducer";
import { userType, siteType } from "./globalState.types";

export type initialStateType = {
  user: any;
  site: any;
  logInUser?: (userData: userType) => void;
  logOutUser?: () => void;
  addSite?: (siteData: siteType) => void;
  resetSite?: () => void;
};

export const initialState: initialStateType = {
  user: "",
  site: "",
};

export const GlobalContext = createContext(initialState);

type Props = {
  children: JSX.Element;
};

export const GlobalProvider: React.FC<Props> = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  const logInUser = (userData: userType) => {
    dispatch({ type: LOG_IN_USER, payload: userData });
  };

  const logOutUser = () => {
    dispatch({ type: LOG_OUT_USER, payload: "" });
  };

  const addSite = (siteData: siteType) => {
    dispatch({ type: ADD_SITE_DATA, payload: siteData });
  };

  const resetSite = () => {
    dispatch({ type: RESET_SITE, payload: "" });
  };

  return (
    <GlobalContext.Provider
      value={{
        user: state.user,
        site: state.site,
        logInUser,
        logOutUser,
        addSite,
        resetSite,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

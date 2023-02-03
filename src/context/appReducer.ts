import updateLocalStorage from "../utils/updateLocalStorage";
import {
  ADD_SITE_DATA,
  LOG_IN_USER,
  LOG_OUT_USER,
  RESET_SITE,
} from "./actionTypes";
import { initialState, initialStateType } from "./GlobalState";
import { siteType, userType } from "./globalState.types";

type reducerActionTypes = { type: string; payload: any };

const appReducer = (state: initialStateType, action: reducerActionTypes) => {
  switch (action.type) {
    case LOG_IN_USER:
      updateLocalStorage("userToken", action.payload?.token);
      return { ...state, user: action.payload };
    case LOG_OUT_USER:
      updateLocalStorage("userToken", "");
      return { ...state, user: "" };
    case ADD_SITE_DATA:
      updateLocalStorage("siteCode", action.payload?.siteCode);
      return { ...state, site: action.payload };
    case RESET_SITE:
      updateLocalStorage("userToken", "");
      updateLocalStorage("siteCode", "");
      return initialState;
    default:
      return state;
  }
};

export default appReducer;

import { applyMiddleware, combineReducers, createStore } from "redux";
import thunk from "redux-thunk";
import logger from "redux-logger";
import * as settings from "./settings.redux";

export interface State {
  settings: settings.SettingsState;
}

export const store = createStore(
  combineReducers({
    settings: settings.reducers,
  }),
  applyMiddleware(thunk, logger)
);

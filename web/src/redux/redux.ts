import { applyMiddleware, combineReducers, createStore } from "redux";
import thunk from "redux-thunk";
import logger from "redux-logger";
import * as account from "./account.redux";
import * as settings from "./settings.redux";
import * as services from "./services.redux";

export interface State {
  services: services.ServicesState;
  account: account.AccountState;
  settings: settings.SettingsState;
}

export const store = createStore(
  combineReducers({
    services: services.reducers,
    settings: settings.reducers,
    account: account.reducers
  }),
  applyMiddleware(thunk, logger)
);

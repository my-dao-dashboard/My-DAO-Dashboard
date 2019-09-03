import { applyMiddleware, combineReducers, createStore } from "redux";
import thunk from "redux-thunk";
import logger from "redux-logger";
import { Registry } from "../services/registry";
import * as account from './account.redux'
import { AccountState } from './account.redux';

export const registry = new Registry();

export interface State {
  account: AccountState
}

export const store = createStore(
  combineReducers({
    account: account.reducers(registry.metamask())
  }),
  applyMiddleware(thunk, logger)
);

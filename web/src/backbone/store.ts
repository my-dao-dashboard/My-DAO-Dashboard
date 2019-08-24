import {applyMiddleware, combineReducers, createStore} from "redux";
import thunk from "redux-thunk"
import logger from 'redux-logger'
import {State} from "./State";
import * as account from './account'

export const store = createStore(combineReducers({
    account: account.reducers
}), applyMiddleware(thunk,
    // logger
))

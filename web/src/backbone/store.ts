import {applyMiddleware, combineReducers, createStore} from "redux";
import thunk from "redux-thunk"
import logger from 'redux-logger'
import {State} from "./State";

export const store = createStore(combineReducers({
}), applyMiddleware(thunk,
    // logger
))

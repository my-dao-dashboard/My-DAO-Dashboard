import {applyMiddleware, combineReducers, createStore} from "redux";
import thunk from "redux-thunk"
import * as account from './account'
import * as daos from './daos'

export const store = createStore(combineReducers({
    account: account.reducers,
    daos: daos.reducers,
}), applyMiddleware(thunk,
    // logger
))

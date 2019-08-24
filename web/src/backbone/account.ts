import actionCreatorFactory from "typescript-fsa";
import asyncFactory from "typescript-fsa-redux-thunk";
import * as services from './services'
import {reducerWithInitialState} from "typescript-fsa-reducers";
import {AccountState} from "./State";

const action = actionCreatorFactory('ACCOUNT')
const asyncAction = asyncFactory<AccountState>(action)

const INITIAL_STATE: AccountState = {
    address: undefined
}

export const getAddress = asyncAction<void, string>('GET_ADDRESS', async () => {
    return services.accountService.getAddress()
});

export const reducers = reducerWithInitialState(INITIAL_STATE)
    .case(getAddress.async.started, (state) => {
        return {
            ...state
        }
    })
    .case(getAddress.async.failed, (state) => {
        return {
            ...state
        }
    })
    .case(getAddress.async.done, (state, payload) => {
        const address = payload.result
        return {
            address: address
        }
    })

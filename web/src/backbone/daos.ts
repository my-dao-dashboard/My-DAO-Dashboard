import actionCreatorFactory from "typescript-fsa";
import asyncFactory from "typescript-fsa-redux-thunk";
import {reducerWithInitialState} from "typescript-fsa-reducers";
import {DaoInstanceState, DaosState} from "./State";
import * as services from './services'

const action = actionCreatorFactory('DAOS')
const asyncAction = asyncFactory<DaosState>(action)

const INITIAL_STATE: DaosState = {
    daos: undefined,
};

export const getDaos = asyncAction<string, Array<DaoInstanceState>>('GET_DAOS', async (address) => {
    return services.daosService.getDaos(address)
});

export const reducers = reducerWithInitialState(INITIAL_STATE)
    .case(getDaos.async.started, (state) => {
        return state
    })
    .case(getDaos.async.failed, (state) => {
        return {
            ...state,
            daos: []
        }
    })
    .case(getDaos.async.done, (state, payload) => {
        const daos = payload.result
        return {
            ...state,
            daos
        }
    })

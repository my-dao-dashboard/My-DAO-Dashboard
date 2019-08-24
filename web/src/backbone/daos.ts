import actionCreatorFactory from "typescript-fsa";
import { reducerWithInitialState } from "typescript-fsa-reducers";
import asyncFactory from "typescript-fsa-redux-thunk";
import * as services from "./services";
import { DaoInstanceState, DaosState } from "./State";

const action = actionCreatorFactory("DAOS");
const asyncAction = asyncFactory<DaosState>(action);

const INITIAL_STATE: DaosState = {
  daos: undefined,
  dao: undefined
};

let DAOS_LIST: Array<DaoInstanceState> = []

async function fillDaos (userAddress: string): Promise<void> {
  if (DAOS_LIST.length === 0) {
    DAOS_LIST = await services.daosService.getDaos(userAddress);
  }
}

export const getDaos = asyncAction<string, DaoInstanceState[]>("GET_DAOS", async address => {
  return services.daosService.getDaos(address);
});

export const getDao = asyncAction<string, DaoInstanceState>("GET_DAO", async address => {
  return services.daosService.getDao(address);
});

export const reducers = reducerWithInitialState(INITIAL_STATE)
  .case(getDaos.async.started, state => {
    return state;
  })
  .case(getDaos.async.failed, state => {
    return {
      ...state,
      daos: []
    };
  })
  .case(getDaos.async.done, (state, payload) => {
    const daos = payload.result;
    return {
      ...state,
      daos
    };
  })
  .case(getDao.async.started, state => {
    return state;
  })
  .case(getDao.async.failed, state => {
    return {
      ...state,
      dao: undefined
    };
  })
  .case(getDao.async.done, (state, payload) => {
    const dao = payload.result;
    console.log(dao);
    return {
      ...state,
      dao
    };
  });

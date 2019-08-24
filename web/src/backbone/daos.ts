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

export const getDaos = asyncAction<string, DaoInstanceState[]>("GET_DAOS", async account => {
  await fillDaos(account)
  return DAOS_LIST
});

export const getDao = asyncAction<[string, string], DaoInstanceState>("GET_DAO", async ([account, daoAddress]) => {
  await fillDaos(account)
  return DAOS_LIST.find(d => d.address === daoAddress.toLowerCase())!
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
    return {
      ...state,
      dao
    };
  });

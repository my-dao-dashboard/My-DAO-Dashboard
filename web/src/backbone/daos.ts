import actionCreatorFactory from "typescript-fsa";
import {reducerWithInitialState} from "typescript-fsa-reducers";
import asyncFactory from "typescript-fsa-redux-thunk";
import * as services from "./services";
import {DaoInstanceState, DaosState} from "./State";
import {VoteProposal} from "./votes.service";
import {votesService} from "./services";

const action = actionCreatorFactory("DAOS");
const asyncAction = asyncFactory<DaosState>(action);

const INITIAL_STATE: DaosState = {
  daos: undefined,
  dao: undefined,
  proposals: undefined
};

let DAOS_LIST: Array<DaoInstanceState> = []

async function fillDaos(userAddress: string): Promise<void> {
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

export const loadProposals = asyncAction<undefined, VoteProposal[]>('LOAD_PROPOSALS', async (params, dispatch, getState) => {
  const state = getState() as any
  const daos = state.daos.daos
  if (daos) {
    let allProposals: VoteProposal[] = []
    for await (const dao of daos) {
      allProposals = allProposals.concat(await votesService.getVotes(dao))
    }
    return allProposals
  } else {
    return []
  }
})

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
  }).case(loadProposals.async.started, state => {
    return state
  })
  .case(loadProposals.async.failed, state => {
    return state
  })
  .case(loadProposals.async.done, (state, payload) => {
    return {
      ...state,
      proposals: payload.result
    }
  });

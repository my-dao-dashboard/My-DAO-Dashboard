import actionCreatorFactory from "typescript-fsa";
import { reducerWithInitialState } from "typescript-fsa-reducers";
import asyncFactory from "typescript-fsa-redux-thunk";
import { Provider } from "web3/providers";
import { uniq } from "../Components/DaoListComponent/DaoListLoader";
import * as services from "./services";
import { votesService } from "./services";
import { DaoInstanceState, DaosState } from "./State";
import { VoteProposal } from "./votes.service";

// tslint:disable-next-line: no-var-requires
const Box = require("3box");

const action = actionCreatorFactory("DAOS");
const asyncAction = asyncFactory<DaosState>(action);

const INITIAL_STATE: DaosState = {
  daos: undefined,
  dao: undefined,
  proposals: undefined
};

let DAOS_LIST: DaoInstanceState[] = [];

async function fillDaos(accounts: string[]): Promise<void> {
  if (DAOS_LIST.length === 0) {
    // console.log("filling daos for accounts ", accounts);
    for await (const acc of accounts) {
      const daos = await services.daosService.getDaos(acc);
      // console.log("filling for account ", acc, daos);
      DAOS_LIST = DAOS_LIST.concat(daos);
    }
  }
}

export async function openBox(address: string, provider: Provider): Promise<any> {
  return new Promise<any>((resolve, reject) => {
    Box.openBox(address, provider)
      .then((box: any) => {
        resolve(box);
      })
      .catch(reject);
  });
}

export const getDaos = asyncAction<string, DaoInstanceState[]>("GET_DAOS", async account => {
  const box = await openBox(account, services.accountService.web3().currentProvider);
  const space = await box.openSpace("my-dao-dashboard");
  console.log("opened space");
  const boxedAddresses = (await space.private.get("watched-addresses")) as string[] | undefined;
  const accounts = boxedAddresses || [];
  const realAccounts = uniq(accounts.concat(account).map(a => a.toLowerCase()));
  await fillDaos(realAccounts);
  return DAOS_LIST;
});

export const getDao = asyncAction<[string, string], DaoInstanceState>("GET_DAO", async ([account, daoAddress]) => {
  return DAOS_LIST.find(d => d.address === daoAddress.toLowerCase())!;
});

export const loadProposals = asyncAction<undefined, VoteProposal[]>("LOAD_PROPOSALS", async (params, dispatch, getState) => {
  const state = getState() as any;
  const daos = state.daos.daos;
  if (daos) {
    let allProposals: VoteProposal[] = [];
    for await (const dao of daos) {
      allProposals = allProposals.concat(await votesService.getVotes(dao));
    }
    return allProposals;
  } else {
    return [];
  }
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
  })
  .case(loadProposals.async.started, state => {
    return state;
  })
  .case(loadProposals.async.failed, state => {
    return state;
  })
  .case(loadProposals.async.done, (state, payload) => {
    return {
      ...state,
      proposals: payload.result
    };
  });

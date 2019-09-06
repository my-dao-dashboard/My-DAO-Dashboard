import Web3 from "web3";
import actionCreatorFactory from "typescript-fsa";
import asyncFactory from "typescript-fsa-redux-thunk";
import { reducerWithInitialState } from "typescript-fsa-reducers";
import { SettingsState } from "./settings.redux";
import { MetamaskService } from "../services/metamask.service";
import { State } from "./redux";

export interface ServicesState {
  web3: Web3;
  metamask: MetamaskService;
}

export const INITIAL: ServicesState = {
  web3: new Web3(),
  metamask: new MetamaskService()
};

const action = actionCreatorFactory("SERVICES");
const asyncAction = asyncFactory<SettingsState>(action);

export const setWeb3 = action<void>("SET_WEB3");

export const enable = asyncAction<void, ServicesState>("ENABLE", async (_, dispatch, getState: any) => {
  const state = getState() as State;
  const web3 = await state.services.metamask.web3();
  const accounts = await web3.eth.getAccounts();
  return {
    metamask: state.services.metamask,
    web3: web3
  };
});

export const reducers = reducerWithInitialState(INITIAL)
  .case(enable.async.done, (state, payload) => {
    return {
      ...payload.result
    };
  })
  .build();

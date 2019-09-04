import Web3 from "web3";
import actionCreatorFactory from "typescript-fsa";
import asyncFactory from "typescript-fsa-redux-thunk";
import { reducerWithInitialState } from "typescript-fsa-reducers";
import { SettingsState } from "./settings.redux";
import { MetamaskService } from "../services/metamask.service";

export interface ServicesState {
  web3: Web3;
  metamask: MetamaskService;
}

export const INITIAL = {
  web3: new Web3(),
  metamask: new MetamaskService()
};

const action = actionCreatorFactory("SERVICES");
const asyncAction = asyncFactory<SettingsState>(action);

export const enable = action<void>("ENABLE");

export const reducers = reducerWithInitialState(INITIAL)
  .case(enable, state => {
    const web3 = state.metamask.web3();
    return {
      ...state,
      web3
    };
  })
  .build();

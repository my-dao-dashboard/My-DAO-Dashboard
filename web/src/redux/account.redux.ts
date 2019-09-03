import actionCreatorFactory from "typescript-fsa";
import { reducerWithInitialState } from "typescript-fsa-reducers";
import asyncFactory from "typescript-fsa-redux-thunk";
import { MetamaskService } from "../services/metamask.service";

export interface AccountState {
  isMetamask: boolean;
}

const action = actionCreatorFactory("ACCOUNT");
const asyncAction = asyncFactory<AccountState>(action);

export function reducers(metamaskService: MetamaskService) {
  const initialState: AccountState = {
    isMetamask: metamaskService.isMetamask()
  };

  return reducerWithInitialState(initialState).build();
}

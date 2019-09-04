import actionCreatorFactory from "typescript-fsa";
import asyncFactory from "typescript-fsa-redux-thunk";
import { reducerWithInitialState } from "typescript-fsa-reducers";
import { State } from "./redux";
import { MetamaskService } from "../services/metamask.service";
import * as services from "./services.redux";

export interface AccountState {
  isMetamask: boolean;
  address: string;
}

const action = actionCreatorFactory("ACCOUNT");
const asyncAction = asyncFactory<AccountState>(action);

export function initialState(upstream: any): AccountState {
  const isMetamask = Boolean(upstream);
  const address = upstream ? (upstream as any).selectedAddress : "";

  return {
    isMetamask,
    address
  };
}

export const setAddress = action<string>("SET_ADDRESS");

export const enable = asyncAction<void, void>("ENABLE", async (_, dispatch, getState: any) => {
  const state = getState() as State;
  const address = await state.services.metamask.enable();
  await services.enable.action();
  await dispatch(setAddress(address));
});

export const reducers = reducerWithInitialState(initialState(MetamaskService.upstreamProvider()))
  .case(setAddress, (state, address) => {
    return {
      ...state,
      address
    };
  })
  .build();

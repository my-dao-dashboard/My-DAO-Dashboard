import actionCreatorFactory from "typescript-fsa";
import asyncFactory from "typescript-fsa-redux-thunk";
import { reducerWithInitialState } from "typescript-fsa-reducers";
import { Provider } from "web3/providers";
import { State } from "./redux";

const SPACE_NAME = "my-dao-dashboard";
const ADDRESS_KEY = "watched-addresses";

export interface SettingsState {
  watchedAddresses: string[];
  isRead: boolean;
}

export function initialState(): SettingsState {
  return {
    isRead: false,
    watchedAddresses: []
  };
}

const action = actionCreatorFactory("SETTINGS");
const asyncAction = asyncFactory<SettingsState>(action);

export const setWatchedAddresses = action<string>("SET_WATCHED_ADDRESS");

export const readSettings = asyncAction<void, void>("READ_SETTINGS", async (_, dispatch, getState: any) => {
  const state = getState() as State;
  console.log("readSettings");
  // const upstream = upstreamProvider()
  // const address = await enableProvider(upstream);
  // await dispatch(setAddress(address));
});

export const reducers = reducerWithInitialState(initialState()).build();

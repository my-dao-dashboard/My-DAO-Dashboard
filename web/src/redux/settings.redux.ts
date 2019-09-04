import actionCreatorFactory from "typescript-fsa";
import asyncFactory from "typescript-fsa-redux-thunk";
import { reducerWithInitialState } from 'typescript-fsa-reducers';
import { Provider } from "web3/providers";

const SPACE_NAME = 'my-dao-dashboard';
const ADDRESS_KEY = 'watched-addresses';

export interface SettingsState {
  watchedAddresses: string[],
  isRead: boolean
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

export const unboxWatchedAddresses = asyncAction<{account: string, provider: Provider}, void>("UNBOX_WATCHED_ADDRESSES", async (params, dispatch) => {
  console.log('unbox')
  // const upstream = upstreamProvider()
  // const address = await enableProvider(upstream);
  // await dispatch(setAddress(address));
});

export const reducers = reducerWithInitialState(initialState()).build()

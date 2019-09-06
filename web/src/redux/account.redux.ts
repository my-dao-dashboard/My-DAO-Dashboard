import { reducerWithInitialState } from "typescript-fsa-reducers";
import { MetamaskService } from "../services/metamask.service";

export interface AccountState {
  isMetamask: boolean;
  address: string;
}

export function initialState(upstream: any): AccountState {
  const isMetamask = Boolean(upstream);
  const address = upstream ? (upstream as any).selectedAddress : "";

  return {
    isMetamask,
    address
  };
}

export const reducers = reducerWithInitialState(initialState(MetamaskService.upstreamProvider())).build();

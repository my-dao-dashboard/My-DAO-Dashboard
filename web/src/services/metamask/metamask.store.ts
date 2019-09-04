import { Store, StoreConfig } from "@datorama/akita";

export interface MetamaskState {
  isAvailable: boolean;
  isEnabled: boolean;
}

@StoreConfig({ name: "metamask" })
export class MetamaskStore extends Store<MetamaskState> {}

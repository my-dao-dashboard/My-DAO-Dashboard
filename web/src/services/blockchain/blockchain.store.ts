import { Store, StoreConfig } from "@datorama/akita";

export interface BlockchainState {
  address: string;
}

@StoreConfig({ name: "blockchain" })
export class BlockchainStore extends Store<BlockchainState> {}

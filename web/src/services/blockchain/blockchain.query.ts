import { Query } from "@datorama/akita";
import { BlockchainState, BlockchainStore } from "./blockchain.store";

export class BlockchainQuery extends Query<BlockchainState> {
  address$ = this.select(state => state.address);

  constructor(protected store: BlockchainStore) {
    super(store);
  }

  address() {
    return this.getValue().address;
  }
}

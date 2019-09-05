import { Query } from "@datorama/akita";
import { BlockchainState, BlockchainStore } from "./blockchain.store";
import { Observable } from "rxjs";

export class BlockchainQuery extends Query<BlockchainState> {
  address$: Observable<string> = this.select(state => state.address);

  constructor(protected store: BlockchainStore) {
    super(store);
  }

  address() {
    return this.getValue().address;
  }
}

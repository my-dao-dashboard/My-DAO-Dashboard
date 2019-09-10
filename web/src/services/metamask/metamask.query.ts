import { Query } from "@datorama/akita";
import { MetamaskState, MetamaskStore } from "./metamask.store";

export class MetamaskQuery extends Query<MetamaskState> {
  isEnabled$ = this.select(state => state.isEnabled);

  constructor(protected store: MetamaskStore) {
    super(store);
  }

  get isAvailable(): boolean {
    return this.getValue().isAvailable;
  }

  get isEnabled(): boolean {
    return this.getValue().isEnabled;
  }
}

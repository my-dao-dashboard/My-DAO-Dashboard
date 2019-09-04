import { MetamaskStore } from "./metamask.store";
import { MetamaskQuery } from "./metamask.query";

export class MetamaskService {
  readonly upstream: any;
  private readonly store: MetamaskStore;
  readonly query: MetamaskQuery;

  constructor() {
    const w = window as any;
    this.upstream = w.ethereum || (w.web3 && w.web3.currentProvider);
    this.store = new MetamaskStore({
      isAvailable: Boolean(this.upstream),
      isEnabled: Boolean(this.upstream.enable ? this.upstream.selectedAddress : !!this.upstream)
    });
    this.query = new MetamaskQuery(this.store);
  }

  async enable() {
    await this.upstream.enable();
    this.store.update({
      isEnabled: true
    });
  }
}

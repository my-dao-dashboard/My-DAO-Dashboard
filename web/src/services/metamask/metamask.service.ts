import { MetamaskStore } from "./metamask.store";
import { MetamaskQuery } from "./metamask.query";
import { filter, map } from "rxjs/operators";

export class MetamaskService {
  readonly upstream: any;
  private readonly store: MetamaskStore;
  readonly query: MetamaskQuery;

  constructor(window: any) {
    this.upstream = window.ethereum || (window.web3 && window.web3.currentProvider);
    this.store = new MetamaskStore({
      isAvailable: Boolean(this.upstream),
      isEnabled: Boolean(this.upstream && this.upstream.enable ? this.upstream.selectedAddress : !!this.upstream)
    });
    this.query = new MetamaskQuery(this.store);
  }

  get ready$() {
    return this.query.isEnabled$.pipe(
      filter(p => !!p),
      map(() => this.upstream)
    );
  }

  async enable() {
    await this.upstream.enable();
    this.store.update({
      isEnabled: true
    });
  }
}

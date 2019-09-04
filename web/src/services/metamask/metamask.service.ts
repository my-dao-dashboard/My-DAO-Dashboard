import { MetamaskStore } from "./metamask.store";

export class MetamaskService {
  private readonly upstream: any;
  readonly store: MetamaskStore;

  constructor() {
    const w = window as any;
    this.upstream = w.ethereum || (w.web3 && w.web3.currentProvider);
    this.store = new MetamaskStore({
      isAvailable: Boolean(this.upstream),
      isEnabled: Boolean(this.upstream.enable ? this.upstream.selectedAddress : !!this.upstream)
    });
  }

  async enable() {
    await this.upstream.enable();
    this.store.update({
      isEnabled: true
    });
  }
}

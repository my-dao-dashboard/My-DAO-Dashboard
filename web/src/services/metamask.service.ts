import { Provider } from "web3/providers";

export interface MetamaskProvider {
  enable(): Promise<string>;
}

export class MetamaskService {
  readonly upstream: Provider & MetamaskProvider;

  constructor() {
    const w = window as any;
    this.upstream = w.ethereum || (w.web3 && w.web3.currentProvider);
  }

  isMetamask() {
    return Boolean(this.upstream);
  }
}

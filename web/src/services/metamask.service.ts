import Web3 from "web3";

export class MetamaskService {
  upstreamProvider: any;

  constructor() {
    this.upstreamProvider = MetamaskService.upstreamProvider();
  }

  static upstreamProvider() {
    const w = window as any;
    return w.ethereum || (w.web3 && w.web3.currentProvider);
  }

  web3() {
    return new Web3(this.upstreamProvider);
  }

  async enable(): Promise<string> {
    if (this.upstreamProvider && this.upstreamProvider.enable) {
      await this.upstreamProvider.enable();
      return this.upstreamProvider.selectedAddress;
    } else {
      const web3 = new Web3(this.upstreamProvider);
      const accounts = await web3.eth.getAccounts();
      return accounts[0];
    }
  }
}

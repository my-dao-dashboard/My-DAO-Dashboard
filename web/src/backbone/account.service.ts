import Web3 from "web3";

export class AccountService {
  public web3(): Web3 {
    if ((window as any).web3) {
      return new Web3((window as any).web3.currentProvider);
    } else {
      console.log("Web3 not detected. Please login first");
      return new Web3();
    }
  }

  public async getAddress(): Promise<string> {
    const addresses = await this.web3().eth.getAccounts();
    return addresses[0];
  }
}

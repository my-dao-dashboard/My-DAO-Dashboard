import Web3 from "web3";

export class AccountService {
  public web3(): Web3 {
    if (typeof (window as any).ethereum !== "undefined" || typeof (window as any).web3 !== "undefined") {
      return new Web3((window as any).ethereum || (window as any).web3.currentProvider);
    } else {
      console.log("Web3 not detected. Please login first");
      return new Web3(new Web3.providers.HttpProvider("https://mainnet.infura.io/v3/1704f40805834d76b667f4228594b051"));
    }
  }

  public async getAddress(): Promise<string> {
    const addresses = await this.web3().eth.getAccounts();
    return addresses[0];
  }
}

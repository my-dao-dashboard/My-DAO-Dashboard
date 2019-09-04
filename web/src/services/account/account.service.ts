import { AccountStore } from "./account.store";
import Web3 from "web3";

export class AccountService {
  readonly store: AccountStore;
  web3: Web3;

  constructor() {
    this.store = new AccountStore({
      address: ""
    });
    this.web3 = new Web3();
  }

  async updateAddress(upstream: any) {
    this.web3 = new Web3(upstream);
    const address = upstream.selectedAddress;
    if (address) {
      this.store.update({
        address
      });
    } else {
      const accounts = await this.web3.eth.getAccounts();
      this.store.update({
        address: accounts[0]
      });
    }
  }
}

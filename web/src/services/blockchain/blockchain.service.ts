import { BlockchainStore } from "./blockchain.store";
import Web3 from "web3";
import { BlockchainQuery } from "./blockchain.query";
import { filter, map } from "rxjs/operators";

export class BlockchainService {
  private readonly store: BlockchainStore;
  readonly query: BlockchainQuery;
  private web3: Web3;

  constructor() {
    this.store = new BlockchainStore({
      address: ""
    });
    this.query = new BlockchainQuery(this.store);
    this.web3 = new Web3();
  }

  get ready$() {
    return this.query.address$.pipe(
      filter(a => !!a),
      map(a => {
        return {
          address: a,
          web3: this.web3
        };
      })
    );
  }

  isAddress(something: string) {
    return this.web3.utils.isAddress(something);
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

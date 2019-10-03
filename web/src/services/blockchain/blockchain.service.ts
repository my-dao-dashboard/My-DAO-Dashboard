import { BlockchainStore } from "./blockchain.store";
import Web3 from "web3";
import { BlockchainQuery } from "./blockchain.query";
import { filter, map } from "rxjs/operators";
import { Observable } from "rxjs";
import { BlockchainReady } from "./blockchain-ready";

export class BlockchainService {
  private readonly store: BlockchainStore;
  readonly query: BlockchainQuery;
  private web3: Web3;

  constructor(upstream$: Observable<any>) {
    this.store = new BlockchainStore({
      address: ""
    });
    this.query = new BlockchainQuery(this.store);
    this.web3 = new Web3();
    upstream$.subscribe(async upstream => {
      await this.updateUpstream(upstream);
    });
  }

  get ready$(): Observable<BlockchainReady> {
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

  async updateUpstream(upstream: any) {
    if (upstream) {
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
}

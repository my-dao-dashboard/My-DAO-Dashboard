import { DaosStore } from "./daos.store";
import { DaosQuery } from "./daos.query";
import { Observable, zip } from "rxjs";
import Web3 from "web3";

export class DaosService {
  private readonly store: DaosStore;
  readonly query: DaosQuery;

  constructor(watchedAddresses$: Observable<string[]>, web3$: Observable<Web3>, account$: Observable<string>) {
    this.store = new DaosStore({
      daos: []
    });
    this.store.setLoading(true);
    this.query = new DaosQuery(this.store);

    zip(watchedAddresses$, web3$, account$).subscribe(params => {
      console.log('in daos', params)
    });
  }

  loadDaos() {
    console.log(this.loadDaos);
  }
}

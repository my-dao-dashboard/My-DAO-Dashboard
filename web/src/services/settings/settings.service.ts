import { SettingsStore } from "./settings.store";
import { SettingsQuery } from "./settings.query";
import Web3 from "web3";
import { BehaviorSubject, Observable } from "rxjs";
import { filter, first } from "rxjs/operators";

const ThreeBox = require("3box");

const NAMESPACE = "my-dao-dashboard";
const ADDRESS_KEY = "watched-addresses";

export class SettingsService {
  private readonly store: SettingsStore;
  readonly query: SettingsQuery;
  private readonly space$Subject: BehaviorSubject<any>;
  private readonly space$: Observable<any>;

  constructor() {
    this.store = new SettingsStore({
      watchedAddresses: []
    });
    this.store.setLoading(true);
    this.query = new SettingsQuery(this.store);
    this.space$Subject = new BehaviorSubject(undefined)
    this.space$ = this.space$Subject.pipe(filter(s => !!s))
  }

  async openSpace(web3: Web3, address: string) {
    const box = await ThreeBox.openBox(address, web3.currentProvider);
    const space = await box.openSpace(NAMESPACE);
    this.space$Subject.next(space);
  }

  async writeWatchedAddresses(addresses: string[]) {
    const space = await this.space$.pipe(first()).toPromise()
    const toWrite = addresses.map(a => a.toLowerCase());
    await space.private.set(ADDRESS_KEY, toWrite)
    this.store.update({
      watchedAddresses: toWrite
    })
  }

  readWatchedAddresses() {
    this.space$.pipe(first()).subscribe(async space => {
      const boxedAddresses = await space.private.get(ADDRESS_KEY);
      const watchedAddresses = boxedAddresses || [];
      this.store.update({
        watchedAddresses
      });
      this.store.setLoading(false);
    });
  }
}

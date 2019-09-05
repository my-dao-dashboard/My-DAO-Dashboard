import { SettingsStore } from "./settings.store";
import { SettingsQuery } from "./settings.query";
import Web3 from "web3";
import { Subject } from "rxjs";
import { tap } from "rxjs/operators";

const ThreeBox = require("3box");

const NAMESPACE = "my-dao-dashboard";
const ADDRESS_KEY = "watched-addresses";

export class SettingsService {
  private readonly store: SettingsStore;
  readonly query: SettingsQuery;
  private space: any | undefined;

  constructor() {
    this.store = new SettingsStore({
      watchedAddresses: []
    });
    this.store.setLoading(true);
    this.query = new SettingsQuery(this.store);
  }

  async openSpace(web3: Web3, address: string) {
    const box = await ThreeBox.openBox(address, web3.currentProvider);
    this.space = await box.openSpace(NAMESPACE);
    return this.space
  }

  async writeWatchedAddresses(addresses: string[]) {
    console.log(this.writeWatchedAddresses, addresses);
  }

  async readWatchedAddresses() {
    if (!this.space) throw new Error('Must call openSpace first');
    const space = this.space;
    const boxedAddresses = await space.private.get(ADDRESS_KEY);
    const watchedAddresses = boxedAddresses || [];
    this.store.update({
      watchedAddresses
    });
    this.store.setLoading(false);
  }
}

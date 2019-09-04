import { SettingsStore } from "./settings.store";
import { SettingsQuery } from "./settings.query";

export class SettingsService {
  private readonly store: SettingsStore;
  readonly query: SettingsQuery;

  constructor() {
    this.store = new SettingsStore({
      watchedAddresses: []
    });
    this.query = new SettingsQuery(this.store);
  }
}

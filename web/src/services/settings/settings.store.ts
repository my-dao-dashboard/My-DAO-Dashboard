import { Store, StoreConfig } from "@datorama/akita";

export interface SettingsState {
  watchedAddresses: string[];
}

@StoreConfig({ name: "settings" })
export class SettingsStore extends Store<SettingsState> {
  constructor(initialState: SettingsState) {
    super(initialState);
    this.setLoading(true);
  }
}

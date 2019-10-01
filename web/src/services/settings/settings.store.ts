import { Store, StoreConfig } from "@datorama/akita";

export interface SettingsState {
  watchedAddresses: string[];
  isRead: boolean;
}

@StoreConfig({ name: "settings" })
export class SettingsStore extends Store<SettingsState> {}

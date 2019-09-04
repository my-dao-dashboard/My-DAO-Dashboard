import { Query } from "@datorama/akita";
import { SettingsState, SettingsStore } from "./settings.store";

export class SettingsQuery extends Query<SettingsState> {
  // address$ = this.select(state => state.address);

  constructor(protected store: SettingsStore) {
    super(store);
  }

  // address() {
  //   return this.selectLoading()
  // }
}

import { Query } from "@datorama/akita";
import { SettingsState, SettingsStore } from "./settings.store";
import { Observable } from "rxjs";

export class SettingsQuery extends Query<SettingsState> {
  isLoaded: boolean = false;

  watchedAddresses$: Observable<string[]> = this.select(s => s.watchedAddresses);

  constructor(readonly store: SettingsStore) {
    super(store);
    this.selectLoading().subscribe(isLoaded => {
      this.isLoaded = isLoaded;
    });
  }

  get watchedAddresses(): string[] {
    return this.getValue().watchedAddresses || []
  }
}

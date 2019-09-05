import { Query } from "@datorama/akita";
import { SettingsState, SettingsStore } from "./settings.store";
import { filter, map } from "rxjs/operators";
import { Observable, zip } from "rxjs";

export class SettingsQuery extends Query<SettingsState> {
  isLoaded: boolean = false;

  watchedAddresses$: Observable<string[]> = this.select(s => s.watchedAddresses).pipe(map(w => w || []));
  loadedWatchedAddresses$: Observable<string[]> = zip(this.selectLoading(), this.watchedAddresses$).pipe(
    filter(p => !p[0]),
    map(p => p[1])
  );

  constructor(readonly store: SettingsStore) {
    super(store);
    this.selectLoading().subscribe(isLoaded => {
      this.isLoaded = isLoaded;
    });
  }

  get watchedAddresses(): string[] {
    return this.getValue().watchedAddresses || [];
  }
}

import { Query } from "@datorama/akita";
import { SettingsState, SettingsStore } from "./settings.store";
import { filter, map } from "rxjs/operators";
import { Observable, zip } from "rxjs";

export class SettingsQuery extends Query<SettingsState> {
  isLoading: boolean = true;

  isLoading$ = this.selectLoading();
  watchedAddresses$: Observable<string[]> = this.select(s => s.watchedAddresses).pipe(map(w => w || []));
  loadedWatchedAddresses$: Observable<string[]> = zip(this.isLoading$, this.watchedAddresses$).pipe(
    filter(p => !p[0]),
    map(p => p[1])
  );

  constructor(readonly store: SettingsStore) {
    super(store);
    this.selectLoading().subscribe(isLoading => {
      this.isLoading = isLoading;
    });
  }

  get watchedAddresses(): string[] {
    return this.getValue().watchedAddresses || [];
  }
}

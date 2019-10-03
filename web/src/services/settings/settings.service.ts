import { SettingsStore } from "./settings.store";
import { SettingsQuery } from "./settings.query";
import { Observable, ReplaySubject } from "rxjs";
import { mergeMap } from "rxjs/operators";
import { THREEBOX_NAMESPACE, THREEBOX_ADDRESS_KEY } from "../../constants";
import { BlockchainReady } from "../blockchain/blockchain-ready";
import ThreeBox, { Space } from "3box";

export interface LocalStorageSettings {
  watchedAddresses: string[]
}

export class SettingsService {
  private readonly store: SettingsStore;
  readonly query: SettingsQuery;
  private isObserving: boolean;
  private readonly space$: ReplaySubject<Space>;

  constructor(private readonly ready$: Observable<BlockchainReady>) {
    this.store = new SettingsStore({
      watchedAddresses: [],
      isRead: false
    });
    this.query = new SettingsQuery(this.store);
    this.isObserving = false;
    this.space$ = new ReplaySubject<Space>(1);
  }

  private fromLocalStorage(): LocalStorageSettings | undefined {
    const stored = localStorage.getItem(THREEBOX_NAMESPACE);
    if (stored) {
      return JSON.parse(stored);
    } else {
      return undefined
    }
  }

  private toLocalStorage(settings: LocalStorageSettings) {
    localStorage.setItem(THREEBOX_NAMESPACE, JSON.stringify(settings))
  }

  private observe() {
    if (!this.isObserving) {
      const localSettings = this.fromLocalStorage();
      if (localSettings) {
        this.store.update({
          watchedAddresses: localSettings.watchedAddresses,
          isRead: true
        })
      }
      this.ready$
        .pipe(
          mergeMap(ready => ThreeBox.openBox(ready.address, ready.web3.currentProvider)),
          mergeMap(box => box.openSpace(THREEBOX_NAMESPACE))
        )
        .subscribe(space => {
          this.space$.next(space);
        });
      this.space$.subscribe(async space => {
        const watchedAddresses = await space.private.get<string[]>(THREEBOX_ADDRESS_KEY);
        this.store.update({
          watchedAddresses: watchedAddresses || [],
          isRead: true
        });
      });
      this.isObserving = true;
    }
  }

  /**
   * Start observation, and then return isReady$ from query. Has side-effects.
   */
  isRead$() {
    this.observe();
    return this.query.isRead$;
  }

  /**
   * Start observation, and then return watchedAddresses$ from query. Has side-effects.
   */
  watchedAddresses$() {
    this.observe();
    return this.query.watchedAddresses$;
  }

  updateWatchedAddresses(addresses: string[]): Observable<void> {
    this.observe();
    const toWrite = addresses.map(a => a.toLowerCase());
    this.toLocalStorage({
      watchedAddresses: toWrite
    });
    return this.space$.pipe(
      mergeMap(async space => {
        await space.private.set(THREEBOX_ADDRESS_KEY, toWrite);
        this.store.update({
          watchedAddresses: toWrite
        });
      })
    );
  }
}

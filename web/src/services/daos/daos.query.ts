import { Query } from "@datorama/akita";
import { DaosState, DaosStore } from "./daos.store";
import { Observable, zip } from "rxjs";
import { DaoInstanceState } from "../../backbone/State";
import { filter, map } from "rxjs/operators";

export class DaosQuery extends Query<DaosState> {
  isLoaded: boolean = false;

  daos$: Observable<DaoInstanceState[]> = this.select(s => s.daos);
  loadedDaos$: Observable<DaoInstanceState[]> = zip(this.selectLoading(), this.daos$).pipe(
    filter(p => !p[0]),
    map(p => p[1])
  );

  constructor(protected store: DaosStore) {
    super(store);
    this.selectLoading().subscribe(isLoaded => {
      this.isLoaded = isLoaded;
    });
  }

  get daos() {
    return this.getValue().daos;
  }
}

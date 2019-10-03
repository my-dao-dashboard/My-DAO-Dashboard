import { DaosState, DaosStore } from "./daos.store";
import { Observable, zip } from "rxjs";
import { filter, map } from "rxjs/operators";
import { Dao } from "../../model/dao";
import { ImmediateQuery } from "../../util/immediate-query";

export class DaosQuery extends ImmediateQuery<DaosState> {
  isRead$ = this.immediate(s => s.isRead);
  loadedDaos$: Observable<Dao[]> = zip(this.isRead$, this.select(s => s.daos)).pipe(
    filter(p => !p[0]),
    map(p => p[1])
  );

  constructor(protected store: DaosStore) {
    super(store);
  }

  get daos() {
    return this.getValue().daos;
  }

  get isRead() {
    return this.getValue().isRead;
  }

  byAddress(address: string) {
    return this.daos.find(d => d.address === address);
  }

  loadedByAddress$(address: string): Observable<Dao> {
    return this.loadedDaos$.pipe(
      map(daos => daos.filter(d => d.address === address)),
      filter(d => d.length > 0),
      map(d => d[0])
    );
  }
}

import { Query } from "@datorama/akita";
import { DaosState, DaosStore } from "./daos.store";
import { Observable } from "rxjs";
import { DaoInstanceState } from "../../backbone/State";

export class DaosQuery extends Query<DaosState> {
  isLoaded: boolean = false;

  daos$: Observable<DaoInstanceState[]> = this.select(s => s.daos);

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

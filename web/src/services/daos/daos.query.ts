import { Query } from "@datorama/akita";
import { DaosState, DaosStore } from "./daos.store";

export class DaosQuery extends Query<DaosState> {
  isLoaded: boolean = false;

  constructor(protected store: DaosStore) {
    super(store);
    this.selectLoading().subscribe(isLoaded => {
      this.isLoaded = isLoaded;
    });
  }
}

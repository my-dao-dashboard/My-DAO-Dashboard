import { DaosStore } from "./daos.store";
import { DaosQuery } from "./daos.query";

export class DaosService {
  private readonly store: DaosStore;
  readonly query: DaosQuery;

  constructor() {
    this.store = new DaosStore({
      daos: []
    });
    this.store.setLoading(true);
    this.query = new DaosQuery(this.store);
  }
}

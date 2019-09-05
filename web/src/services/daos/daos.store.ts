import { Store, StoreConfig } from "@datorama/akita";
import { DaoInstanceState } from "../../backbone/State";

export interface DaosState {
  daos: DaoInstanceState[];
}

@StoreConfig({ name: "daos" })
export class DaosStore extends Store<DaosState> {}

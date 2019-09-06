import { Store, StoreConfig } from "@datorama/akita";
import { DaoInstanceState } from "../../model/dao-instance-state";

export interface DaosState {
  daos: DaoInstanceState[];
}

@StoreConfig({ name: "daos" })
export class DaosStore extends Store<DaosState> {}

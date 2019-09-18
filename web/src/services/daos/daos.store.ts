import { Store, StoreConfig } from "@datorama/akita";
import { Dao } from "../../model/dao";

export interface DaosState {
  daos: Dao[];
}

@StoreConfig({ name: "daos" })
export class DaosStore extends Store<DaosState> {}

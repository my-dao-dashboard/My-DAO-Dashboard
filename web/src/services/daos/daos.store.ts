import { Store, StoreConfig } from "@datorama/akita";
import { DaoInstanceState } from "../../backbone/State";
import { VoteProposal } from "../../backbone/votes.service";

export interface DaosState {
  daos: DaoInstanceState[];
  proposals: VoteProposal[];
}

@StoreConfig({ name: "daos" })
export class DaosStore extends Store<DaosState> {}

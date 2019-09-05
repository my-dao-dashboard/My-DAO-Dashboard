import { Store, StoreConfig } from "@datorama/akita";
import { VoteProposal } from "../../backbone/votes.service";

export interface ProposalsState {
  proposals: VoteProposal[];
}

@StoreConfig({ name: "proposals" })
export class ProposalsStore extends Store<ProposalsState> {}

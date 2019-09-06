import { DaoInstanceState } from "../backbone/State";
import { TransactionKind } from "./transaction-kind";
import { VoteCount } from "./vote-count";
import { VoteStatus } from "./vote-status";

export interface VoteProposal {
  kind: TransactionKind;
  dao: DaoInstanceState;
  creator: string;
  voteId: number;
  votes: VoteCount;
  title: string;
  timestamp: Date;
  votingAddress: string;
  status: VoteStatus;
}

import { TransactionKind } from "./transaction-kind";
import { VoteCount } from "./vote-count";
import { VoteStatus } from "./vote-status";
import { Dao } from "./dao";

export interface VoteProposal {
  kind: TransactionKind;
  dao: Dao;
  creator: string;
  voteId: number;
  votes: VoteCount;
  title: string;
  timestamp: Date;
  votingAddress: string;
  status: VoteStatus;
}

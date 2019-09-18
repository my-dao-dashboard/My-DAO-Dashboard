import { VoteCount } from "./vote-count";
import { VoteProposal } from "./vote-proposal";
import { VoteStatus } from "./vote-status";
import { Dao } from "./dao";

export interface ProposalColumn {
  key: string;
  id: number;
  name: string;
  description: string;
  status: string;
  type: string;
  created: Date;
  createdBy: string;
  deadline: Date;
  votes: VoteCount;
  dao: Dao;
}

export function formatProposal(proposal: VoteProposal): ProposalColumn {
  return {
    key: `${proposal.dao.address}-${proposal.voteId}`,
    id: proposal.voteId,
    name: `${proposal.dao.name}: Proposal #${proposal.voteId}`,
    description: proposal.title,
    status: proposal.status,
    type: proposal.dao.kind,
    created: proposal.timestamp,
    createdBy: proposal.creator,
    deadline: new Date(),
    votes: proposal.votes,
    dao: proposal.dao
  };
}

export function distributeProposals(voteProposals: VoteProposal[]) {
  const openProposals: ProposalColumn[] = [];
  const proposals: ProposalColumn[] = [];
  for (const proposal of voteProposals) {
    if (proposal.status === VoteStatus.OPEN) {
      openProposals.push(formatProposal(proposal));
    } else {
      proposals.push(formatProposal(proposal));
    }
  }
  const sorted = proposals.sort((a, b) => {
    if (a.created.valueOf() < b.created.valueOf()) {
      return 1;
    } else if (a.created.valueOf() > b.created.valueOf()) {
      return -1;
    } else {
      return 0;
    }
  });
  return {
    proposals: sorted,
    openProposals
  };
}

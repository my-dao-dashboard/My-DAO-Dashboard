import {DaoInstanceState} from "../backbone/State";
import {VoteProposal, VoteStatus} from "../backbone/votes.service";

export interface IProposalColumn {
  key: string,
  id: number,
  name: string,
  description: string,
  status: string,
  type: string,
  created: Date,
  createdBy: string,
  deadline: Date,
  dao: DaoInstanceState,
}

export function formatProposal(proposal: VoteProposal): IProposalColumn {
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
    dao: proposal.dao
  }
}

export function distributeProposals(voteProposals: VoteProposal[]) {
  let openProposals: IProposalColumn[] = []
  let proposals: IProposalColumn[] = []
  for (const proposal of voteProposals) {
    if (proposal.status === VoteStatus.OPEN) {
      openProposals.push(formatProposal(proposal))
    } else {
      proposals.push(formatProposal(proposal))
    }
  }
  const sorted = proposals.sort((a, b) => {
    if (a.created.valueOf() < b.created.valueOf()) {
      return 1
    } else if (a.created.valueOf() > b.created.valueOf()) {
      return -1
    } else {
      return 0
    }
  })
  return {
    proposals: sorted,
    openProposals
  }
}

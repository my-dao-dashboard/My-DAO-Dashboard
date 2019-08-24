import {Badge, Table} from "antd";
import React from "react";
import DaoTag from "../DaoTag";
import {connect} from "react-redux";
import {VoteProposal, VoteStatus} from "../../backbone/votes.service";
import {DaoInstanceState, State} from "../../backbone/State";
import {votesService} from "../../backbone/services";

export interface ProposalColumn {
  key: string,
  name: string,
  description: string,
  status: string,
  type: string,
  created: Date,
  createdBy: string,
  deadline: Date
}

function formatProposal(proposal: VoteProposal): ProposalColumn {
  return {
    key: proposal.voteId.toString(),
    name: `${proposal.dao.name}: Proposal #${proposal.voteId}`,
    description: proposal.title,
    status: proposal.status,
    type: 'Aragon DAO',
    created: proposal.timestamp,
    createdBy: proposal.creator,
    deadline: new Date()
  }
}

const columns = [
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
    render: (item: any) => {
      return (
        <>
          <Badge status="success" />
          <a>{item}</a>
        </>
      );
    }
  },
  {
    title: "Description",
    dataIndex: "description",
    key: "description"
  },
  {
    title: "Type",
    dataIndex: "type",
    key: "type",
    render: (item: any) => {
      return <DaoTag type={item} />;
    }
  },
  {
    title: "Deadline",
    dataIndex: "deadline",
    key: "deadline",
    render: (item: any) => {
      return item.toLocaleDateString();
    }
  },
  {
    title: "Actions",
    dataIndex: "actions",
    key: "actions",
    render: () => {
      return <a>View</a>;
    }
  }
];

interface StateProps {
  daos: Array<DaoInstanceState>;
}

interface ComponentState {
  isLoading: boolean
  openProposals: ProposalColumn[]
  proposals: ProposalColumn[]
}

export class ProposalListComponent extends React.Component<StateProps, ComponentState> {
  constructor(props: StateProps) {
    super(props)
    this.state = {
      isLoading: true,
      openProposals: [],
      proposals: []
    }
  }

  async componentDidMount() {
    let allProposals: VoteProposal[] = []
    for await (const dao of this.props.daos) {
      allProposals = allProposals.concat(await votesService.getVotes(dao))
    }
    let openProposals: ProposalColumn[] = []
    let proposals: ProposalColumn[] = []
    for (const proposal of allProposals) {
      if (proposal.status === VoteStatus.OPEN) {
        openProposals.push(formatProposal(proposal))
      } else {
        proposals.push(formatProposal(proposal))
      }
    }
    const sorted = proposals.sort((a, b) => {
      if (a.created.valueOf() < b.created.valueOf()) {
        return -1
      } else if (a.created.valueOf() > b.created.valueOf()) {
        return 1
      } else {
        return 0
      }
    })
    this.setState({
      isLoading: false,
      openProposals: openProposals,
      proposals: sorted
    })
  }

  public render() {
    if (this.state.isLoading) {
      return <p>Loading Proposals...</p>
    } else {
      return <>
        <div>
          <h2>Open Proposals</h2>
          <Table columns={columns} dataSource={this.state.openProposals} />
        </div>

        <div>
          <h2>Stale Proposals</h2>
          <Table columns={columns} dataSource={this.state.proposals} />
        </div>
      </>
    }
  }
}

function stateToProps(state: State): StateProps {
  return {
    daos: state.daos.daos!
  };
}

export default connect(stateToProps)(ProposalListComponent);

import React from "react";
import {connect} from "react-redux";
import {DaoInstanceState, State} from "../../backbone/State";
import {VoteProposal} from "../../backbone/votes.service";
import {DummyProposalListComponent} from "../DummyProposalListComponent";
import {distributeProposals} from "../IProposalColumn";
import Loader from "../Layout/Loader/Loader";

interface Props {
  dao: DaoInstanceState;
}

interface StateProps {
  proposals: VoteProposal[] | undefined
}

export class ProposalListComponent extends React.Component<StateProps> {
  public render() {
    if (this.props.proposals) {
      const { openProposals, proposals } = distributeProposals(this.props.proposals)
      return <DummyProposalListComponent openProposals={openProposals} proposals={proposals}/>
    } else {
      return <Loader/>
    }
  }
}

function stateToProps(state: State, props: Props): StateProps {
  const dao = props.dao
  if (state.daos.proposals) {
    return {
      proposals: state.daos.proposals.filter(p => p.dao.address === dao.address)
    };
  } else {
    return {
      proposals: undefined
    }
  }
}

export default connect(stateToProps)(ProposalListComponent);

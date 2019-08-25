import React from "react";
import {connect} from "react-redux";
import {State} from "../backbone/State";
import {VoteProposal} from "../backbone/votes.service";
import {distributeProposals} from "./IProposalColumn";
import {DummyProposalListComponent} from "./DummyProposalListComponent";
import Loader from "./Layout/Loader/Loader";

interface StateProps {
  proposals: VoteProposal[] | undefined
}

export class OverallProposalListComponent extends React.Component<StateProps> {
  public render() {
    if (this.props.proposals) {
      const { openProposals, proposals } = distributeProposals(this.props.proposals)
      return <DummyProposalListComponent openProposals={openProposals} proposals={proposals}/>
    } else {
      return <Loader/>
    }
  }
}

function stateToProps(state: State): StateProps {
  return {
    proposals: state.daos.proposals
  };
}

export default connect(stateToProps)(OverallProposalListComponent);

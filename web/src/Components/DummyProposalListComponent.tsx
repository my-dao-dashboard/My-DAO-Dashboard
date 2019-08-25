import React from "react";
import ProposalTable from "./ProposalListComponent/ProposalTable";
import {IProposalColumn} from "./IProposalColumn";

interface Props {
  openProposals: IProposalColumn[]
  proposals: IProposalColumn[]
}

export class DummyProposalListComponent extends React.Component<Props> {
  renderActiveProposals() {
    if (this.props.openProposals.length > 0) {
      return <>
        <div>
          <h3>Active Proposals</h3>
          <ProposalTable open={true} source={this.props.openProposals} />
        </div>

        <br/>
      </>
    } else {
      return <></>
    }
  }

  render() {
      return <>
        {this.renderActiveProposals()}
        <div>
          <h3>Sealed Proposals</h3>
          <ProposalTable open={false} source={this.props.proposals} />
        </div>
      </>
  }
}

import React from "react";
import ProposalTable from "./ProposalListComponent/ProposalTable";
import {IProposalColumn} from "./IProposalColumn";

interface Props {
  openProposals: IProposalColumn[]
  proposals: IProposalColumn[]
}

export class DummyProposalListComponent extends React.Component<Props> {
  render() {
      return <>
        <div>
          <h3>Active Proposals</h3>
          <ProposalTable open={true} source={this.props.openProposals} />
        </div>

        <br/>

        <div>
          <h3>Sealed Proposals</h3>
          <ProposalTable open={false} source={this.props.proposals} />
        </div>
      </>
  }
}

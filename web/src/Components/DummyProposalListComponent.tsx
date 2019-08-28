import React from "react";
import {IProposalColumn} from "./IProposalColumn";
import ProposalTable from "./ProposalListComponent/ProposalTable";

interface Props {
  openProposals: IProposalColumn[]
  proposals: IProposalColumn[]
}

export class DummyProposalListComponent extends React.Component<Props> {
  public renderActiveProposals() {
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

  public render() {
      return <>
        {this.renderActiveProposals()}
        <div>
          <h3>Sealed Proposals</h3>
          <ProposalTable open={false} source={this.props.proposals} />
        </div>
      </>
  }
}

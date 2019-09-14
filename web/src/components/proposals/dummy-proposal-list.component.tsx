import React from "react";
import ProposalTableComponent from "./proposal-table.component";
import { ProposalColumn } from "../../model/proposal-column";

interface Props {
  openProposals: ProposalColumn[]
  proposals: ProposalColumn[]
}

export class DummyProposalListComponent extends React.Component<Props> {
  public renderActiveProposals() {
    if (this.props.openProposals.length > 0) {
      return <>
        <div>
          <h3>Active Proposals</h3>
          <ProposalTableComponent open={true} source={this.props.openProposals} />
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
          <ProposalTableComponent open={false} source={this.props.proposals} />
        </div>
      </>
  }
}

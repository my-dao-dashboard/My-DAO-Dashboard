import React from "react";
import { connect } from "react-redux";
import { DaoInstanceState, State } from "../../backbone/State";
import ProposalListComponent from "../ProposalListComponent/ProposalListComponent";
import { Tag, Row, Col } from "antd";
import DaoLink from "../DaoLink";

interface StateProps {
  dao: DaoInstanceState;
}

export class DaoOverview extends React.Component<StateProps> {
  public render() {
    return (
      <div>
        <Row>
          <Col span={12}>
            <h2>{this.props.dao.name}</h2>
          </Col>
          <Col span={12} style={{ textAlign: "right" }}>
            <Tag color="cyan">{this.props.dao.kind}</Tag>
          </Col>
        </Row>
        <DaoLink type={this.props.dao.kind} address={this.props.dao.address} />
        <p>
          Voting power: {this.props.dao.shareBalance} / {this.props.dao.totalSupply}
        </p>
        <div>
          <ProposalListComponent />
        </div>
      </div>
    );
  }
}

function stateToProps(state: State): StateProps {
  return {
    dao: state.daos.dao!
  };
}

export default connect(stateToProps)(DaoOverview);

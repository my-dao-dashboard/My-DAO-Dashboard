import React from "react";
import { connect } from "react-redux";
import { DaoInstanceState, State } from "../../backbone/State";
import ProposalListComponent from "../ProposalListComponent/ProposalListComponent";
import { Tag, Row, Col } from "antd";

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
        <a href={`https://mainnet.aragon.org/#/${this.props.dao.address}`} target="_blank" rel="noopener noreferrer">
          <small>{this.props.dao.address}</small>
        </a>
        <p>
          Voting power: {this.props.dao.shareBalance.toNumber()} / {this.props.dao.totalSupply.toString()}
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

import { Progress, Statistic } from "antd";
import React from "react";
import { connect } from "react-redux";
import { DaoInstanceState, State } from "../../backbone/State";
import DaoLink from "../DaoLink";
import DaoTag from "../DaoTag";
import ProposalListComponent from "../ProposalListComponent/ProposalListComponent";

interface StateProps {
  dao: DaoInstanceState;
}

export class DaoOverview extends React.Component<StateProps> {
  public render() {
    return (
      <div>
        <h2 style={{ display: "inline" }}>{this.props.dao.name}</h2> &nbsp; <DaoTag type={this.props.dao.kind} />
        <br/>
        <DaoLink type={this.props.dao.kind} address={this.props.dao.address} />
        <br/>

        <div style={{ maxWidth: "300px"}}>
          <Statistic title="Balance" value={this.props.dao.usdBalance} precision={2} />
          <div className="ant-statistic-title">Voting power <small>({this.props.dao.shareBalance} of {this.props.dao.totalSupply})</small></div>
          <Progress percent={
              Math.round((this.props.dao.shareBalance / this.props.dao.totalSupply) * 100)} status="active" />
        </div>
        <br/><br/>
        <div>
          <ProposalListComponent dao={this.props.dao} />
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

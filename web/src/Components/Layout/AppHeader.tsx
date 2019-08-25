import { Col, Row, Avatar, Tooltip } from "antd";
import React, { Component } from "react";
import { Link } from "react-router-dom";
import { State } from "../../backbone/State";
import { connect } from "react-redux";

interface Props {
  account: string;
}

export class AppHeader extends Component<Props> {
  public render() {
    return (
      <div style={{ color: "#fff" }}>
        <Row>
          <Col span={12}>
            <Link to="/">My DAO Dashboard</Link>
          </Col>
          <Col span={12} style={{ textAlign: "right" }}>
            <Link to={"/settings"}>Settings</Link>&nbsp;&nbsp;&nbsp;&nbsp;
            <Tooltip title={this.props.account} placement="left">
              <Avatar shape="square" style={{ color: '#000' }} size="large">
                {this.props.account.substring(0, 5)}
              </Avatar>
            </Tooltip>
          </Col>
        </Row>
      </div>
    );
  }
}

function mapStateToProps(state: State): Props {
  return {
    account: state.account.address!
  };
}

export default connect(mapStateToProps)(AppHeader);

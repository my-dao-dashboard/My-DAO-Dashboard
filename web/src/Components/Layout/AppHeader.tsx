import { Avatar, Col, Divider, Row, Tooltip } from "antd";
import makeBlockie from "ethereum-blockies-base64";
import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { State } from "../../backbone/State";

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
            <Link to={"/settings"}>Settings</Link>
            &nbsp;
            <Divider type="vertical" />
            &nbsp;
            <Tooltip title={this.props.account} placement="left">
              <Avatar src={makeBlockie(this.props.account)} />
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

import { Col, Row } from "antd";
import React, { Component } from "react";
import { Link } from "react-router-dom";

export class AppHeader extends Component {
  public render() {
    return (
      <div style={{ color: "#fff" }}>
        <Row>
          <Col span={12}>
            <Link to="/">My DAO Dashboard</Link>
          </Col>
          <Col span={12} style={{ textAlign: "right" }}>
            <span>0x0123userAddress</span>
          </Col>
        </Row>
      </div>
    );
  }
}

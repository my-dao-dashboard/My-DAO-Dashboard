import { Avatar, Col, Row, Tooltip } from "antd";
import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { BlockchainContext } from "../../contexts/blockchain.context";

export const AppHeaderComponent: React.FC = () => {
  const blockchain = useContext(BlockchainContext);
  const [address, setAddress] = useState(blockchain.query.address());

  useEffect(() => {
    const subscription = blockchain.query.address$.subscribe(setAddress);
    return () => {
      subscription.unsubscribe();
    };
  });

  const shortAddress = address.substring(0, 5);

  return (
    <div style={{ color: "#fff" }}>
      <Row>
        <Col span={12}>
          <Link to="/">My DAO Dashboard</Link>
        </Col>
        <Col span={12} style={{ textAlign: "right" }}>
          <Link to={"/settings"}>Settings</Link>&nbsp;&nbsp;&nbsp;&nbsp;
          <Tooltip title={address} placement="left">
            <Avatar shape="square" style={{ color: "#000" }} size="large">
              {shortAddress}
            </Avatar>
          </Tooltip>
        </Col>
      </Row>
    </div>
  );
};

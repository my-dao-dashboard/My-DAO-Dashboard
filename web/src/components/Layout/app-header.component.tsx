import { Avatar, Col, Divider, Row, Tooltip, Typography } from "antd";
import makeBlockie from "ethereum-blockies-base64";
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
  }, [blockchain.query.address$]);

  const shortAddress = address.substring(0, 5);

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
          <Tooltip title={address} placement="left">
            <Avatar src={makeBlockie(address)} />
            &nbsp; &nbsp;
            <small>{shortAddress}</small>
          </Tooltip>
        </Col>
      </Row>
    </div>
  );
};

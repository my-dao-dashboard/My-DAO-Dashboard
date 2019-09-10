import { Avatar, Col, Divider, Layout, Row, Tooltip } from "antd";
import makeBlockie from "ethereum-blockies-base64";
import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { BlockchainContext } from "../../contexts/blockchain.context";

const { Header } = Layout;

export const AppHeaderComponent: React.FC = () => {
  const blockchain = useContext(BlockchainContext);
  const [address, setAddress] = useState(blockchain.query.address);

  useEffect(() => {
    const subscription = blockchain.query.address$.subscribe(setAddress);
    return () => {
      subscription.unsubscribe();
    };
  }, [blockchain.query.address$]);

  const shortAddress = address.substring(0, 5);

  const renderUserInfo = () => {
    if (address) {
      return (
        <>
          <Link to={"/settings"}>Settings</Link>
          &nbsp;
          <Divider type="vertical" />
          &nbsp;
          <Tooltip title={address} placement="left">
            <Avatar src={makeBlockie(address || "unknown")} />
            &nbsp; &nbsp;
            <small>{shortAddress}</small>
          </Tooltip>
        </>
      );
    } else {
      return "";
    }
  };

  return (
    <Header style={{ position: "fixed", zIndex: 1, width: "100%" }}>
      <div style={{ color: "#fff" }}>
        <Row>
          <Col span={12}>
            <Link to="/">My DAO Dashboard</Link>
          </Col>
          <Col span={12} style={{ textAlign: "right" }}>
            {renderUserInfo()}
          </Col>
        </Row>
      </div>
    </Header>
  );
};

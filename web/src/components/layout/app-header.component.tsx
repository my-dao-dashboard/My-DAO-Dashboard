import { Col, Divider, Layout, Row } from "antd";
import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { BlockchainContext } from "../../contexts/blockchain.context";
import AccountInfoComponent from "../account/info/account-info.component";

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

  const renderUserInfo = () => {
    if (address) {
      return (
        <>
          <Link to={"/settings"}>Settings</Link>
          &nbsp;
          <Divider type="vertical" />
          &nbsp;
          <AccountInfoComponent address={address} />
        </>
      );
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

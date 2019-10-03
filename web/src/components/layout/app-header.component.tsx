import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { BlockchainContext } from "../../contexts/blockchain.context";
import AccountInfoComponent from "../account/info/account-info.component";


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
          <AccountInfoComponent address={address} />
        </>
      );
    }
  };

  return (
      <div className="MDDheader">
        <Link to={"/"}>
        <div className="logo_container">
          <div className="logo">
            <svg version="1.1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 32 32">
              <g>
                <path className="MDDlogofill" d="M16,0.1c-8.8,0-16,7.2-16,16c0,8.8,7.2,16,16,16c8.8,0,16-7.2,16-16C32,7.3,24.8,0.1,16,0.1z M16,29.6
                  c-7.4,0-13.5-6.1-13.5-13.5C2.5,8.7,8.5,2.6,16,2.6c7.4,0,13.5,6.1,13.5,13.5C29.5,23.6,23.4,29.6,16,29.6z"/>
                <path className="MDDlogofill" d="M23.9,8.7L20,15.9c0,0.1,0,0.2,0,0.3c0,2-1.6,3.6-3.6,3.6c-2,0-3.6-1.6-3.6-3.6c0-2,1.6-3.6,3.6-3.6
                  c0.3,0,0.6,0,0.9,0.1l4-3.2c-1.4-1-3.1-1.7-5-1.7l-7.2,0l0,16.8h7.2c4.7,0,8.4-3.8,8.4-8.4c0-1.3-0.3-2.6-0.9-3.7V8.7z"/>
                <path className="MDDlogofill" d="M14.3,16.2c0,1.2,1,2.1,2.1,2.1c1.2,0,2.1-1,2.1-2.1c0-1.2-1-2.1-2.1-2.1C15.2,14,14.3,15,14.3,16.2z"/>
              </g>
            </svg>
          </div>
          <div className="txt">
            My DAO Dashboard
          </div>
        </div>
        </Link>
        <div className="usersection">
          {renderUserInfo()}
        </div>

        {/* <Row>
          <Col span={12}>
            <Link to="/">My DAO Dashboard</Link>
          </Col>
          <Col span={12} style={{ textAlign: "right" }}>
            {renderUserInfo()}
          </Col>
        </Row> */}
      </div>
  );
};

import React, { useContext, useEffect, useState } from "react";
import { Popover, Button } from 'antd';
import { Link } from "react-router-dom";
import { BlockchainContext } from "../../contexts/blockchain.context";
import AccountInfoComponent from "../account/info/account-info.component";
import { ReactComponent as Logo } from "../../assets/icons/MyDD_logo.svg";

export const AppHeaderComponent: React.FC = () => {
  const blockchain = useContext(BlockchainContext);
  const [address, setAddress] = useState(blockchain.query.address);
  const [visible, setVisible] = useState(false);

  console.log(visible);

  const hide = () => {
    setVisible(false)
  };

  const handleVisibleChange = () => {
      if(visible) {
        setVisible(false)

      }
  };

  useEffect(() => {
    const subscription = blockchain.query.address$.subscribe(setAddress);
    return () => {
      subscription.unsubscribe();
    };
  }, [blockchain.query.address$]);

  const togglemenu = (
    <div className="togglemenu">
      <a onClick={hide} target="blank" href="/">Show on Etherscan</a>
      <Link onClick={hide} to={"/settings"}>My watchlist</Link>
      <a onClick={hide}>Logout</a>
    </div>
  );


  const renderUserInfo = () => {
    if (address) {
      return (
        <>
          

          <Popover
            content={togglemenu}
            placement="bottom"
            trigger="click"
            visible={visible}
            onVisibleChange={handleVisibleChange}
          >
          <Button className="togglebtn" onClick={() => setVisible(true)}>
            <AccountInfoComponent address={address} />
          </Button>
          </Popover>
        </>
      );
    }
  };

  return (
      <div className="MDDheader">
        <Link to={"/"}>
        <div className="logo_container">
          <div className="logo">
            <Logo />
          </div>
          <div className="txt">
            My DAO Dashboard
          </div>
        </div>
        </Link>
        <div className="usersection">
          {renderUserInfo()}
        </div>
      </div>
  );
};

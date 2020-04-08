import React, { useContext } from "react";
import { DashboardLoader } from "../components/dashboard/dashboard.loader";
import { DaoListComponent } from "../components/dashboard/dao-list.component";
import { ProposalsComponent } from "../components/proposals/proposals.component";
import logo from "../assets/images/My_DAO_Dashboard_logo_500x500.png";
import { Layout } from "antd";
import { BlockchainContext } from "../contexts/blockchain.context";
import { Jazzicon } from "@ukstv/jazzicon-react";

const { Header, Content } = Layout;

export const DashboardPage: React.FC = () => {
  const blockchain = useContext(BlockchainContext);

  return (
    <>
      <Layout>
        <Header>
          <div className="logo_box">
            <img src={logo} />
            <p>My DAO dashboard</p>
          </div>
          <div className="user_box">
            <p>{blockchain.query.address}</p>
            <Jazzicon address={blockchain.query.address} className={"jazzicon"} />
          </div>
        </Header>
        <Content>
          <DashboardLoader>
            <DaoListComponent />
            <ProposalsComponent />
          </DashboardLoader>
        </Content>
      </Layout>
    </>
  );
};

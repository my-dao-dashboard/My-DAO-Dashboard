import React from "react";
import { DashboardLoader } from "../components/dashboard/dashboard.loader";
import { DaoListComponent } from "../components/dashboard/dao-list.component";
import { ProposalsComponent } from "../components/proposals/proposals.component";
import logo from '../assets/images/My_DAO_Dashboard_logo_500x500.png';

import { Layout } from 'antd';
const { Header, Content } = Layout;

export const DashboardPage: React.FC = () => {
  return (
  <>
    <Layout>
      <Header>
        <div className="logo_box">
          <img src={logo} />
          <p>My DAO dashboard</p>
        </div>
        <div className="user_box">
          <p>0x2C39955c9662678535d68a966862A06956ea5785</p>
          <img src="" />
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

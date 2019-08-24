import { Layout } from "antd";
import React from "react";
import { Provider } from "react-redux";
import AccountComponent from "./AccountComponent/AccountComponent";
import "./App.css";
import { store } from "./backbone/store";
import DaoListComponent from "./DaoListComponent/DaoListComponent";
import DaoListLoader from "./DaoListComponent/DaoListLoader";
import ProposalListComponent from "./ProposalListComponent/ProposalListComponent";

const { Header, Content, Footer } = Layout;

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <AccountComponent>
        <Layout>
          <Header style={{ position: "fixed", zIndex: 1, width: "100%" }}>
            <div className="logo">My DAO Dashboard</div>
          </Header>
          <Content style={{ padding: "0 50px", marginTop: 64 }}>
            <div style={{ background: "#fff", padding: 24, minHeight: 380 }}>
              <h1>My DAO Dashboard</h1>
              <DaoListLoader>
                <DaoListComponent />
                <ProposalListComponent />
              </DaoListLoader>
            </div>
          </Content>
          <Footer style={{ textAlign: "center" }}>ETH Berlin Zwei</Footer>
        </Layout>
      </AccountComponent>
    </Provider>
  );
};

export default App;

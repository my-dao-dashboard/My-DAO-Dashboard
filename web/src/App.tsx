import { Icon, Layout } from "antd";
import React from "react";
import { Provider } from "react-redux";
import { Redirect, Route } from "react-router";
import "./App.css";
import { store } from "./backbone/store";
import AccountComponent from "./Components/AccountComponent/AccountComponent";
import AppHeader from "./Components/Layout/AppHeader";
import DAO from "./Pages/DAO";
import Dashboard from "./Pages/Dashboard";
import DaoListLoader from "./Components/DaoListComponent/DaoListLoader";
import ProposalLoader from "./Components/ProposalLoader";
import Settings from "./Components/Settings/Settings";

const { Header, Content, Footer } = Layout;

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <AccountComponent>
        <Layout>
          <Header style={{ position: "fixed", zIndex: 1, width: "100%" }}>
            <AppHeader />
          </Header>
          <Content className="container">
            <div className="content">
              <Route exact path="/settings" component={Settings} />
              {/*<DaoListLoader>*/}
              {/*  <ProposalLoader>*/}
              {/*    <Route exact path="/" component={Dashboard} />*/}
              {/*    <Route exact path="/dao/:address" component={DAO} />*/}
              {/*    <Route exact path="/settings" component={Settings} />*/}
              {/*    <Redirect to="/" />*/}
              {/*  </ProposalLoader>*/}
              {/*</DaoListLoader>*/}
            </div>
          </Content>
          <Footer style={{ textAlign: "center" }}>
            <a href="https://github.com/wslyvh/My-DAO-Dashboard" target="_blank" rel="noopener noreferrer" className="text-muted">
              <Icon type="github" />
            </a> &nbsp;
            ETHBerlin Zwei
          </Footer>
        </Layout>
      </AccountComponent>
    </Provider>
  );
};

export default App;

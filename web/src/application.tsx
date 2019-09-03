import { Icon, Layout } from "antd";
import React from "react";
import { Provider } from "react-redux";
import { Redirect, Route } from "react-router";
import "./assets/styles/app.css";
import { store } from "./backbone/store";
import AccountComponent from "./components/AccountComponent/AccountComponent";
import DaoListLoader from "./components/DaoListComponent/DaoListLoader";
import AppHeader from "./components/Layout/AppHeader";
import ProposalLoader from "./components/ProposalLoader";
import Settings from "./components/Settings/Settings";
import DAO from "./pages/DAO";
import Dashboard from "./pages/Dashboard";
import { BrowserRouter } from "react-router-dom";

const { Header, Content, Footer } = Layout;

const Application: React.FC = () => {
  return (
    <BrowserRouter>
      <Provider store={store}>
        <AccountComponent>
          <Layout>
            <Header style={{ position: "fixed", zIndex: 1, width: "100%" }}>
              <AppHeader />
            </Header>
            <Content className="container">
              <div className="content">
                <Route exact path="/settings" component={Settings} />
                <DaoListLoader>
                  <ProposalLoader>
                    <Route exact path="/" component={Dashboard} />
                    <Route exact path="/dao/:address" component={DAO} />
                    <Route exact path="/settings" component={Settings} />
                    <Redirect to="/" />
                  </ProposalLoader>
                </DaoListLoader>
              </div>
            </Content>
            <Footer style={{ textAlign: "center" }}>
              <a
                href="https://github.com/wslyvh/My-DAO-Dashboard"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted"
              >
                <Icon type="github" />
              </a>{" "}
              &nbsp; ETHBerlin Zwei
            </Footer>
          </Layout>
        </AccountComponent>
      </Provider>
    </BrowserRouter>
  );
};

export default Application;

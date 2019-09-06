import { Icon, Layout } from "antd";
import React from "react";
import { Redirect, Route, Switch } from "react-router";
import "./assets/styles/app.css";
import { AppHeaderComponent } from "./components/layout/app-header.component";
import { SettingsPage } from "./pages/settings.page";
import { DashboardPage } from "./pages/dashboard.page";
import { BrowserRouter } from "react-router-dom";
import { AvailableMetamaskContainer } from "./components/account/available-metamask.container";
import { DaoPage } from "./pages/dao.page";

const { Header, Content, Footer } = Layout;

const Application: React.FC = () => {
  return (
    <BrowserRouter>
      <AvailableMetamaskContainer>
        <Layout>
          <Header style={{ position: "fixed", zIndex: 1, width: "100%" }}>
            <AppHeaderComponent />
          </Header>
          <Content className="container">
            <div className="content">
              <Switch>
                <Route exact path="/" component={DashboardPage} />
                <Route exact path="/dao/:address" component={DaoPage} />
                <Route exact path="/settings" component={SettingsPage} />
                <Redirect to="/" />
              </Switch>
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
      </AvailableMetamaskContainer>
    </BrowserRouter>
  );
};

export default Application;

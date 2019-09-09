import { Layout } from "antd";
import React from "react";
import { Redirect, Route, Switch } from "react-router";
import "./assets/styles/app.css";
import { BrowserRouter } from "react-router-dom";
import { AvailableMetamaskContainer } from "./components/account/available-metamask.container";
import { AppFooterComponent } from "./components/layout/app-footer.component";
import { AppHeaderComponent } from "./components/layout/app-header.component";
import { DaoPage } from "./components/dao.page";
import { DashboardPage } from "./components/dashboard.page";
import { SettingsPage } from "./components/settings.page";

const { Content } = Layout;

const Application: React.FC = () => {
  return (
    <BrowserRouter>
      <AvailableMetamaskContainer>
        <Layout>
          <AppHeaderComponent />

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
          <AppFooterComponent />
        </Layout>
      </AvailableMetamaskContainer>
    </BrowserRouter>
  );
};

export default Application;

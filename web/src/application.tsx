import { Layout } from "antd";
import React from "react";
import { Redirect, Route, Switch } from "react-router";
import "./assets/styles/app.css";
import { BrowserRouter } from "react-router-dom";
import { AvailableMetamaskContainer } from "./components/account/available-metamask.container";
// import { AppFooterComponent } from "./components/layout/app-footer.component";
// import { AppHeaderComponent } from "./components/layout/app-header.component";
import { LandingPage } from "./components/landing.page";

import { DaoPage } from "./components/dao.page";
import { DashboardPage } from "./components/dashboard.page";
import { SettingsPage } from "./components/settings.page";


const Application: React.FC = () => {
  return (
    <BrowserRouter>
        <AvailableMetamaskContainer>
          <Switch>
            <Route exact path="/" component={LandingPage} />
            <Route exact path="/dashboard" component={DashboardPage} />
            <Route exact path="/dao/:address" component={DaoPage} />
            <Route exact path="/settings" component={SettingsPage} />
            <Redirect to="/" />
          </Switch>
        </AvailableMetamaskContainer>
    </BrowserRouter>
  );
};

export default Application;

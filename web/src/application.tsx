import { Layout } from "antd";
import React from "react";
import { Provider } from "react-redux";
import { Redirect, Route, Switch } from "react-router";
import { BrowserRouter } from "react-router-dom";
import "./assets/styles/app.css";
import { AvailableMetamaskContainer } from "./components/account/available-metamask.container";
import { AppFooterComponent } from "./components/Layout/app-footer.component";
import { AppHeaderComponent } from "./components/Layout/app-header.component";
import { DaoPage } from "./pages/dao.page";
import { DashboardPage } from "./pages/dashboard.page";
import { SettingsPage } from "./pages/settings.page";
import { store } from "./redux/redux";

const { Content } = Layout;

const Application: React.FC = () => {
  return (
    <BrowserRouter>
      <Provider store={store}>
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
      </Provider>
    </BrowserRouter>
  );
};

export default Application;

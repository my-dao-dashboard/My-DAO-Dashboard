import { Icon, Layout } from "antd";
import React from "react";
import { Provider } from "react-redux";
import { Redirect, Route } from "react-router";
import "./assets/styles/app.css";
import DaoListLoader from "./components/DaoListComponent/DaoListLoader";
import AppHeader from "./components/Layout/app-header.component";
import ProposalLoader from "./components/ProposalLoader";
import Settings from "./pages/settings.page";
import DAO from "./pages/DAO";
import Dashboard from "./pages/Dashboard";
import { BrowserRouter } from "react-router-dom";
import { store } from "./redux/redux";
import { AvailableMetamaskContainer } from "./components/account/available-metamask.container";
import SettingsLoader from "./components/settings/settings.loader";

const { Header, Content, Footer } = Layout;

const Application: React.FC = () => {
  return (
    <BrowserRouter>
      <Provider store={store}>
        <AvailableMetamaskContainer>
          {/*<SettingsLoader>*/}
          {/*  <Layout>*/}
          {/*    <Header style={{ position: "fixed", zIndex: 1, width: "100%" }}>*/}
          {/*      <AppHeader />*/}
          {/*    </Header>*/}
          {/*    <Content className="container">*/}
          {/*      <div className="content">*/}
          {/*        /!*<DaoListLoader>*!/*/}
          {/*        /!*  <ProposalLoader>*!/*/}
          {/*        /!*    <Route exact path="/" component={Dashboard} />*!/*/}
          {/*        /!*    <Route exact path="/dao/:address" component={DAO} />*!/*/}
          {/*        <Route exact path="/settings" component={Settings} />*/}
          {/*        <Redirect to="/" />*/}
          {/*        /!*  </ProposalLoader>*!/*/}
          {/*        /!*</DaoListLoader>*!/*/}
          {/*      </div>*/}
          {/*    </Content>*/}
          {/*    <Footer style={{ textAlign: "center" }}>*/}
          {/*      <a*/}
          {/*        href="https://github.com/wslyvh/My-DAO-Dashboard"*/}
          {/*        target="_blank"*/}
          {/*        rel="noopener noreferrer"*/}
          {/*        className="text-muted"*/}
          {/*      >*/}
          {/*        <Icon type="github" />*/}
          {/*      </a>{" "}*/}
          {/*      &nbsp; ETHBerlin Zwei*/}
          {/*    </Footer>*/}
          {/*  </Layout>*/}
          {/*</SettingsLoader>*/}
        </AvailableMetamaskContainer>
      </Provider>
    </BrowserRouter>
  );
};

export default Application;

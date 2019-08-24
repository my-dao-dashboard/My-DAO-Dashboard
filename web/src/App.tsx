import { Layout } from "antd";
import React from "react";
import { Provider } from "react-redux";
import { Route } from "react-router";
import "./App.css";
import { store } from "./backbone/store";
import AccountComponent from "./Components/AccountComponent/AccountComponent";
import { AppHeader } from "./Components/Layout/AppHeader";
import DAO from "./Pages/DAO";
import Dashboard from "./Pages/Dashboard";

const { Header, Content, Footer } = Layout;

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <AccountComponent>
        <Layout>
          <Header style={{ position: "fixed", zIndex: 1, width: "100%" }}>
            <AppHeader />
          </Header>
          <Content style={{ padding: "0 50px", marginTop: 64 }}>
            <div style={{ background: "#fff", padding: 24, minHeight: 380 }}>
              <Route exact path="/" component={Dashboard} />
              <Route exact path="/dao/:id" component={DAO} />
            </div>
          </Content>
          <Footer style={{ textAlign: "center" }}>ETH Berlin Zwei</Footer>
        </Layout>
      </AccountComponent>
    </Provider>
  );
};

export default App;

import { Breadcrumb, Layout, Menu } from "antd";
import React from "react";
import "./App.css";
import { Provider } from 'react-redux'
import DaoListComponent from "./DaoListComponent/DaoListComponent";
import { store } from './backbone/store'

const { Header, Content, Footer } = Layout;

const App: React.FC = () => {
   return <Provider store={store}>
      <Layout>
        <Header style={{ position: "fixed", zIndex: 1, width: "100%" }}>
          <div className="logo">My DAO Dashboard</div>
        </Header>
        <Content style={{ padding: "0 50px", marginTop: 64 }}>
          <div style={{ background: "#fff", padding: 24, minHeight: 380 }}>
            <p>My DAO Dashboard</p>
          </div>
            <DaoListComponent/>
        </Content>
        <Footer style={{ textAlign: "center" }}>ETH Berlin Zwei</Footer>
      </Layout>
    </Provider>
};

export default App;

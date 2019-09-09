import { Avatar, Button, Layout, message } from "antd";
import React, { useContext } from "react";
import { MetamaskContext } from "../../contexts/metamask.context";
import { useProgress } from "../../hooks/use-progress";
import { AppFooterComponent } from "../layout/app-footer.component";
import { AppHeaderComponent } from "../layout/app-header.component";

const { Content } = Layout;

export const LoginComponent: React.FC = () => {
  const metamask = useContext(MetamaskContext);
  const progress = useProgress(false);

  const onClick = async () => {
    if (!progress.isRunning()) {
      progress.start();
      try {
        await metamask.enable();
      } catch (e) {
        progress.stop(e);
      }
    }
  };

  const renderError = () => {
    const error = progress.isError();
    if (error) {
      message.error(error);
      return undefined;
    } else {
      return undefined;
    }
  };

  const renderButton = () => {
    if (progress.isRunning()) {
      return (
        <Button type="primary" disabled>
          Connecting..
        </Button>
      );
    } else {
      return (
        <Button type="primary" onClick={onClick}>
          Connect
        </Button>
      );
    }
  };

  return (
    <>
      <Layout>
        <AppHeaderComponent />
        <Content className="container">
          <div className="content" style={{ textAlign: "center" }}>
            <Avatar size={64} icon="user" />
            <p>You are not logged in</p>
            {renderError()}
            {renderButton()}
          </div>
        </Content>
        <AppFooterComponent />
      </Layout>
    </>
  );
};

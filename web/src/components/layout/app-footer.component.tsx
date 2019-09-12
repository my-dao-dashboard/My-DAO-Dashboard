import { Icon, Layout } from "antd";
import React from "react";

const { Footer } = Layout;

export const AppFooterComponent: React.FC = () => {
  return (
    <>
      <Footer style={{ textAlign: "center" }}>
        <a
          href="https://github.com/my-dao-dashboard/My-DAO-Dashboard"
          target="_blank"
          rel="noopener noreferrer"
          className="text-muted"
        >
          <Icon type="github" />
        </a>{" "}
        &nbsp; ETHBerlin Zwei
      </Footer>
    </>
  );
};

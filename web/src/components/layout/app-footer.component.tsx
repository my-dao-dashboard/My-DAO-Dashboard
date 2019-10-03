import { Icon } from "antd";
import React from "react";

export const AppFooterComponent: React.FC = () => {
  return (
    <>
      <div className="MDDfooter">
        <a
          href="https://github.com/my-dao-dashboard/My-DAO-Dashboard"
          target="_blank"
          rel="noopener noreferrer"
          className="text-muted"
        >
          <Icon type="github" />
        </a>{" "}
        &nbsp; ETHBerlin Zwei
      </div>
    </>
  );
};

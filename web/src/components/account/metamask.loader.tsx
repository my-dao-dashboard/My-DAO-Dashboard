import React, { useContext } from "react";
import { NotMetamaskComponent } from "./not-metamask.component";
import { AccountLoader } from "./account.loader";
import { MetamaskContext } from "../../contexts/metamask.context";

export const MetamaskLoader: React.FC = props => {
  const metamask = useContext(MetamaskContext);
  const isAvailable = metamask.query.isAvailable();

  if (isAvailable) {
    return <AccountLoader>{props.children}</AccountLoader>;
  } else {
    return <NotMetamaskComponent />;
  }
};

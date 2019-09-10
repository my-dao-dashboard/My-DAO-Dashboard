import React, { useContext } from "react";
import { NoMetamaskView } from "./no-metamask.view";
import { EnableMetamaskContainer } from "./enable-metamask.container";
import { MetamaskContext } from "../../contexts/metamask.context";

export const AvailableMetamaskContainer: React.FC = props => {
  const metamask = useContext(MetamaskContext);
  const isAvailable = metamask.query.isAvailable;

  if (isAvailable) {
    return <EnableMetamaskContainer>{props.children}</EnableMetamaskContainer>;
  } else {
    return <NoMetamaskView />;
  }
};

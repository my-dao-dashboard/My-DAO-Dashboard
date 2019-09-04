import React, { useContext, useEffect, useState } from "react";
import { LoginComponent } from "./login.component";
import { MetamaskContext } from "../../contexts/metamask.context";

export const EnableMetamaskContainer: React.FC = (props) => {
  const metamask = useContext(MetamaskContext);
  const [isEnabled, setEnabled] = useState(metamask.query.isEnabled());

  useEffect(() => {
    metamask.query.isEnabled$.subscribe(setEnabled);
  });

  if (isEnabled) {
    return <>{props.children}</>;
  } else {
    return <LoginComponent />;
  }
};

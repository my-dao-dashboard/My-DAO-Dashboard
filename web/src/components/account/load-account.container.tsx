import React, { useContext, useEffect, useState } from "react";
import { AccountContext } from "../../contexts/account.context";

export const LoadAccountContainer: React.FC = props => {
  const accountContext = useContext(AccountContext);
  const [address, setAddress] = useState(accountContext.query.address());

  useEffect(() => {
    if (!address) {
      const subscription = accountContext.query.address$.subscribe(setAddress);
      return () => {
        subscription.unsubscribe();
      };
    }
  });

  if (address) {
    return <>{props.children}</>;
  } else {
    return <></>;
  }
};

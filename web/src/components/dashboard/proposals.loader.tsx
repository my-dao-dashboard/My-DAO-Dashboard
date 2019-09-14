import React, { useContext, useEffect, useState } from "react";
import { ProposalsContext } from "../../contexts/proposals.context";
import LoaderView from "../layout/loader/loader.view";

export const ProposalsLoader: React.FC = props => {
  const proposalsContext = useContext(ProposalsContext);
  const [isLoading, setIsLoading] = useState(proposalsContext.query.isLoading);

  useEffect(() => {
    const subscription = proposalsContext.query.isLoading$.subscribe(setIsLoading);
    return () => {
      subscription.unsubscribe();
    };
  }, [proposalsContext.query.isLoading$]);

  if (isLoading) {
    return <LoaderView />;
  } else {
    return <>{props.children}</>;
  }
};

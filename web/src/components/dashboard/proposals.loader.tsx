import React, { useContext, useEffect, useState } from "react";
import { ProposalsContext } from "../../contexts/proposals.context";
import Loader from "../Layout/Loader/Loader";

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
    return <Loader />;
  } else {
    return <>{props.children}</>;
  }
};

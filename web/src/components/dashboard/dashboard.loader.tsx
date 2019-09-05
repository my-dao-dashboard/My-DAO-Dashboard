import React, { useContext, useEffect, useState } from "react";
import { DaosContext } from "../../contexts/daos.context";
import Loader from "../Layout/Loader/Loader";

export const DashboardLoader: React.FC = props => {
  const daosContext = useContext(DaosContext);
  const [isLoaded, setIsLoaded] = useState(daosContext.query.isLoaded);

  useEffect(() => {
    const subscription = daosContext.query.selectLoading().subscribe(isLoading => {
      setIsLoaded(!isLoading);
    });

    return () => {
      subscription.unsubscribe();
    };
  });

  if (isLoaded) {
    return <>{props.children}</>;
  } else {
    return <Loader message={"Loading DAOs..."} />;
  }
};

import React, { useContext, useEffect, useState } from "react";
import { DaosContext } from "../../contexts/daos.context";
import Loader from "../Layout/Loader/Loader";
import { SettingsContext } from "../../contexts/settings.context";
import { zip } from "rxjs";
import { map } from "rxjs/operators";

export const DashboardLoader: React.FC = props => {
  const daosContext = useContext(DaosContext);
  const settingsContext = useContext(SettingsContext);
  const [isLoading, setIsLoading] = useState(daosContext.query.isLoading || settingsContext.query.isLoading);

  useEffect(() => {
    const isLoading$ = zip(daosContext.query.isLoading$, settingsContext.query.isLoading$).pipe(map(t => t[0] && t[1]));
    const subscription = isLoading$.subscribe(isLoading => {
      setIsLoading(isLoading);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [daosContext.query.isLoading$, settingsContext.query.isLoading$]);

  if (isLoading) {
    return <Loader message={"Loading DAOs..."} />;
  } else {
    return <>{props.children}</>;
  }
};

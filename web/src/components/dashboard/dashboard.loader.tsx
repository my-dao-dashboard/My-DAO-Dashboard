import React, { useContext, useEffect, useState } from "react";
import { DaosContext } from "../../contexts/daos.context";
import Loader from "../Layout/Loader/Loader";
import { SettingsContext } from "../../contexts/settings.context";
import { zip } from "rxjs";
import { map } from "rxjs/operators";

export const DashboardLoader: React.FC = props => {
  const daosContext = useContext(DaosContext);
  const settingsContext = useContext(SettingsContext);
  const [isLoaded, setIsLoaded] = useState(daosContext.query.isLoaded && settingsContext.query.isLoaded);

  useEffect(() => {
    const selectLoading = zip(daosContext.query.selectLoading(), settingsContext.query.selectLoading()).pipe(
      map(t => t[0] && t[1])
    );
    const subscription = selectLoading.subscribe(isLoading => {
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

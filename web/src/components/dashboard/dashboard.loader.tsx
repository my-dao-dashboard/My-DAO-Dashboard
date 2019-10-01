import React, { useContext, useEffect, useState } from "react";
import { DaosContext } from "../../contexts/daos.context";
import LoaderView from "../layout/loader/loader.view";
import { SettingsContext } from "../../contexts/settings.context";
import { zip } from "rxjs";
import { map } from "rxjs/operators";

export const DashboardLoader: React.FC = props => {
  const daosContext = useContext(DaosContext);
  const settingsContext = useContext(SettingsContext);
  const [isRead, setRead] = useState(daosContext.query.isRead && settingsContext.query.isRead$.value);

  useEffect(() => {
    const isRead$ = zip(daosContext.query.isRead$, settingsContext.query.isRead$).pipe(map(t => t[0] && t[1]));
    const subscription = isRead$.subscribe(isRead => {
      setRead(isRead);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [daosContext.query.isRead, settingsContext.query.isRead$.value]);

  if (isRead) {
    return <>{props.children}</>;
  } else {
    return <LoaderView message={"Loading DAOs..."} />;
  }
};

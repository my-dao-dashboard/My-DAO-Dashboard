import React, { useContext, useEffect, useState } from "react";
import { DaosContext } from "../../contexts/daos.context";
import { DaoListView } from "./dao-list.view";

export const DaoListComponent: React.FC = () => {
  const daosContext = useContext(DaosContext);
  const [daos, setDaos] = useState(daosContext.query.daos);

  useEffect(() => {
    const subscription = daosContext.query.loadedDaos$.subscribe(setDaos);
    return () => {
      subscription.unsubscribe();
    };
  }, [daosContext.query.loadedDaos$]);

  return <DaoListView daos={daos} />;
};

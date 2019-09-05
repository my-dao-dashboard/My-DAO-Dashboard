import React, { useContext, useEffect, useState } from "react";
import { DaosContext } from "../../contexts/daos.context";
import { DaoListView } from "./dao-list.view";

export const DaoListComponent: React.FC = () => {
  const daosContext = useContext(DaosContext);
  const [daos, setDaos] = useState(daosContext.query.daos);

  useEffect(() => {
    const subscription = daosContext.query.daos$.subscribe(setDaos);
    return () => {
      subscription.unsubscribe();
    };
  });

  return <DaoListView daos={daos} />;
};

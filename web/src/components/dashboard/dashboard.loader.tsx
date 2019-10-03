import React, { useContext } from "react";
import { DaosContext } from "../../contexts/daos.context";
import LoaderView from "../layout/loader/loader.view";
import { useImmediateObservable } from "../../util/use-immediate-observable";

export const DashboardLoader: React.FC = props => {
  const daosContext = useContext(DaosContext);
  const isRead = useImmediateObservable(daosContext.query.isRead$);

  if (isRead) {
    return <>{props.children}</>;
  } else {
    return <LoaderView message={"Loading DAOs..."} />;
  }
};

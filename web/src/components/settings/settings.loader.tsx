import React, { useContext } from "react";
import { SettingsContext } from "../../contexts/settings.context";
import LoaderView from "../layout/loader/loader.view";
import { useImmediateObservable } from "../../util/use-immediate-observable";

export const SettingsLoader: React.FC = props => {
  const settings = useContext(SettingsContext);
  const isRead = useImmediateObservable(settings.isRead$());

  if (isRead) {
    return <>{props.children}</>;
  } else {
    return <LoaderView message={"Opening 3Box profile..."} />;
  }
};

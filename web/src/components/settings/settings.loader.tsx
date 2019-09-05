import React, { useContext, useEffect, useState } from "react";
import { SettingsContext } from "../../contexts/settings.context";
import Loader from "../Layout/Loader/Loader";

export const SettingsLoader: React.FC = (props) => {
  const settings = useContext(SettingsContext);
  const [isLoaded, setLoaded] = useState<boolean>(settings.query.isLoaded);

  useEffect(() => {
    const subscription = settings.query.selectLoading().subscribe(isLoading => {
      setLoaded(!isLoading);
    });
    return () => {
      subscription.unsubscribe();
    };
  });

  if (isLoaded) {
    return <>{props.children}</>;
  } else {
    return <Loader message={"Opening 3Box profile..."} />;
  }
};

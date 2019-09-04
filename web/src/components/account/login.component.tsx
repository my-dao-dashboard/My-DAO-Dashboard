import React, { useContext } from "react";
import { useProgress } from "../../hooks/use-progress";
import { MetamaskContext } from "../../contexts/metamask.context";

export const LoginComponent: React.FC = () => {
  const metamask = useContext(MetamaskContext);
  const progress = useProgress(false);

  const onClick = async () => {
    if (!progress.isRunning()) {
      progress.start();
      try {
        await metamask.service.enable();
        progress.stop();
      } catch (e) {
        progress.stop(e);
      }
    }
  };

  const renderError = () => {
    const error = progress.isError();
    if (error) {
      return <p>{error}</p>;
    } else {
      return undefined;
    }
  };

  const renderButton = () => {
    if (progress.isRunning()) {
      return <button disabled={true}>Waiting...</button>;
    } else {
      return <button onClick={onClick}>Connect</button>;
    }
  };

  return (
    <>
      <p>You are not logged in</p>
      {renderError()}
      {renderButton()}
    </>
  );
};

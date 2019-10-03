import React, { ChangeEvent, useContext, useState } from "react";
import { SettingsContext } from "../../contexts/settings.context";
import _ from "underscore";
import { isAddress } from "../../util/is-address";
import { useProgress } from "../../util/use-progress";
import { useImmediateObservable } from "../../util/use-immediate-observable";

export const AddressesFormComponent: React.FC = props => {
  const settings = useContext(SettingsContext);
  const watchedAddresses = useImmediateObservable(settings.watchedAddresses$());
  const [addressesToStore, setAddressesToStore] = useState<string[]>([]);
  const savingProgress = useProgress(false);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    savingProgress.start();
    const stop = savingProgress.stop.bind(savingProgress);
    settings.updateWatchedAddresses(addressesToStore).subscribe(stop, stop, stop);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const addresses = _.uniq(
      value
        .replace(/\s+/g, "")
        .split(",")
        .filter(isAddress)
    );
    setAddressesToStore(addresses);
  };

  const renderError = () => {
    if (savingProgress.isError()) {
      return <p>{savingProgress.isError()}</p>;
    } else {
      return undefined;
    }
  };

  const renderButton = () => {
    if (savingProgress.isRunning()) {
      return <button disabled={true}>Saving...</button>;
    } else {
      return <button type={"submit"}>Save</button>;
    }
  };

  return (
    <>
      <p>Please, use commas to separate the addresses:</p>
      <form onSubmit={handleSubmit}>
        <p>
          <input type={"text"} onChange={handleChange} style={{ width: "80%" }} />
        </p>
        <p>To save: {addressesToStore.join(", ")}</p>
        <p>Currently stored: {watchedAddresses.join(", ")}</p>
        {renderError()}
        <p>{renderButton()}</p>
        <br />
      </form>
    </>
  );
};

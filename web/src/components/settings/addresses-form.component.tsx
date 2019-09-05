import React, { ChangeEvent, useContext, useEffect, useState } from "react";
import { SettingsContext } from "../../contexts/settings.context";
import { BlockchainContext } from "../../contexts/blockchain.context";
import _ from "underscore";
import { useProgress } from "../../hooks/use-progress";

export const AddressesFormComponent: React.FC = props => {
  const settings = useContext(SettingsContext);
  const blockchain = useContext(BlockchainContext);
  const [watchedAddresses, setWatchedAddresses] = useState(settings.query.watchedAddresses);
  const [addressesToStore, setAddressesToStore] = useState<string[]>([]);
  const savingProgress = useProgress(false);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      savingProgress.start();
      await settings.writeWatchedAddresses(addressesToStore);
      savingProgress.stop();
    } catch (e) {
      savingProgress.stop(e);
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const web3 = blockchain.web3;
    const addresses = _.uniq(
      value
        .replace(/\s+/g, "")
        .split(",")
        .filter(smth => {
          return web3.utils.isAddress(smth);
        })
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

  useEffect(() => {
    const subscription = settings.query.watchedAddresses$.subscribe(setWatchedAddresses);
    return () => {
      subscription.unsubscribe();
    };
  });

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

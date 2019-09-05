import React, { ChangeEvent, useContext, useEffect, useState } from "react";
import { SettingsContext } from "../../contexts/settings.context";
import { BlockchainContext } from "../../contexts/blockchain.context";
import _ from "underscore";

export const AddressesFormComponent: React.FC = props => {
  const settings = useContext(SettingsContext);
  const blockchain = useContext(BlockchainContext);
  const [watchedAddresses, setWatchedAddresses] = useState(settings.query.watchedAddresses);
  const [addressesToStore, setAddressesToStore] = useState<string[]>([]);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    await settings.writeWatchedAddresses(addressesToStore);
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
        <p>To save: {addressesToStore.join(', ')}</p>
        <p>Currently stored: {watchedAddresses.join(", ")}</p>
        <p>
          <button type={"submit"}>Save</button>
        </p>
        <br />
      </form>
    </>
  );
};

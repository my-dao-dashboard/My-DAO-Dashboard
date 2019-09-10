import { BlockchainService } from "./blockchain.service";
import { BlockchainQuery } from "./blockchain.query";
import { runEffect, withEffect } from "../../util/testing";
import { cold } from "jest-marbles";
import { first, pluck } from "rxjs/operators";
import HDWalletProvider from "@machinomy/hdwallet-provider";

const VALUES = {
  u: "",
  a: "a",
  b: "b"
};

let service: BlockchainService;

beforeEach(() => {
  service = new BlockchainService();
});

describe("constructor", () => {
  it("set fields", () => {
    expect(service.query).toBeInstanceOf(BlockchainQuery);
    expect(service.query.address).toEqual("");
  });
});

describe("#ready$ and updateUpstream", () => {
  // Web3 is a circular JSON structure, from perpspective of JSON.stringify.
  // Rx.js testing does not support circular JSON structures.
  // So, we could not use marbles :(

  it("if window.ethereum", async () => {
    const e1 = runEffect("-aab|", VALUES, address => service.updateUpstream({ selectedAddress: address }));
    const expected = cold("-a-b-", VALUES);
    expect(withEffect(e1, service.ready$).pipe(pluck("address"))).toBeObservable(expected);
  });

  it("if provider", async () => {
    const provider = new HDWalletProvider({
      rpcUrl: "https://rinkeby.infura.io",
      mnemonic: "jar joy dwarf rotate fall company april coach federal typical timber liquid"
    });
    await service.updateUpstream(provider);
    const expectedAddress = (await provider.getAddresses())[0];
    const r = await service.ready$.pipe(first()).toPromise();
    const actualAddress = (await r.web3.eth.getAccounts())[0];
    expect(actualAddress.toLowerCase()).toEqual(expectedAddress);
  });
});

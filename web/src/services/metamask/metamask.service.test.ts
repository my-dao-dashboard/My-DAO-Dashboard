import HDWalletProvider from "@machinomy/hdwallet-provider";
import { MetamaskService } from "./metamask.service";
import { runEffect, withEffect } from "../../util/testing";
import { cold } from "jest-marbles";
import { MetamaskStore } from "./metamask.store";

describe("constructor", () => {
  describe("window.ethereum", function() {
    it("not enabled", () => {
      const window = {
        ethereum: {
          enable: jest.fn()
        }
      };
      const service = new MetamaskService(window);
      expect(service.upstream).toBe(window.ethereum);
      expect(service.query.isAvailable).toEqual(true);
      expect(service.query.isEnabled).toEqual(false);
    });

    it("enabled", () => {
      const window = {
        ethereum: {
          enable: jest.fn(),
          selectedAddress: 'foo'
        }
      };
      const service = new MetamaskService(window);
      expect(service.upstream).toBe(window.ethereum);
      expect(service.query.isAvailable).toEqual(true);
      expect(service.query.isEnabled).toEqual(true);
    });
  });

  it("for window.web3", () => {
    const provider = new HDWalletProvider({
      rpcUrl: "http://rinkeby.infura.io",
      mnemonic: "foo"
    });
    const window = {
      web3: {
        currentProvider: provider
      }
    };
    const service = new MetamaskService(window);
    expect(service.upstream).toBe(provider);
    expect(service.query.isAvailable).toEqual(true);
    expect(service.query.isEnabled).toEqual(true);
  });
});

it("#isEnabled$", () => {
  const service = new MetamaskService(window);
  const store = (service as any).store as MetamaskStore;
  const VALUES = {
    t: true,
    f: false,
  };
  const updateAddress$ = runEffect("t-f-f-t|", VALUES, isEnabled => store.update({ isEnabled }));
  const expected$ = cold("f-t-f-t|", VALUES);

  expect(withEffect(updateAddress$, service.query.isEnabled$)).toBeObservable(expected$);
});

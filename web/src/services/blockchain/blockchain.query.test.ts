import { BlockchainQuery } from "./blockchain.query";
import { BlockchainStore } from "./blockchain.store";
import { cold } from "jest-marbles";
import { runEffect, withEffect } from "../../util/testing";

const VALUES = {
  a: "a",
  b: "b"
};

let store: BlockchainStore;
let query: BlockchainQuery;

beforeEach(() => {
  store = new BlockchainStore({
    address: VALUES.a
  });
  query = new BlockchainQuery(store);
});

it("#address$", () => {
  const updateAddress$ = runEffect("abba|", VALUES, address => store.update({ address }));
  const expected$ = cold("ab-a", VALUES);

  expect(withEffect(updateAddress$, query.address$)).toBeObservable(expected$);
});

it("#address", () => {
  expect(query.address).toEqual(VALUES.a);
  store.update({ address: VALUES.b });
  expect(query.address).toEqual(VALUES.b);
});

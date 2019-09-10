import { BlockchainQuery } from "./blockchain.query";
import { BlockchainStore } from "./blockchain.store";
import { cold } from "jest-marbles";
import { zip } from "rxjs";
import { map } from "rxjs/operators";
import { withEffect } from "../../util/testing";

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
  const e1 = withEffect("abba|", VALUES, address => store.update({ address }));
  const expected = cold("ab-a", VALUES);

  expect(zip(e1, query.address$).pipe(map(t => t[1]))).toBeObservable(expected);
});

it("#address", () => {
  expect(query.address).toEqual(VALUES.a);
  store.update({ address: VALUES.b });
  expect(query.address).toEqual(VALUES.b);
});

import { cold } from "jest-marbles";
import { runEffect, withEffect } from "../../util/testing";
import { MetamaskStore } from "./metamask.store";
import { MetamaskQuery } from "./metamask.query";

let store: MetamaskStore;
let query: MetamaskQuery;

beforeEach(() => {
  store = new MetamaskStore({});
  query = new MetamaskQuery(store);
});

it("#isAvailable", () => {
  expect(query.isAvailable).toEqual(undefined);
  store.update({ isAvailable: true });
  expect(query.isAvailable).toEqual(true);
  store.update({ isAvailable: false });
  expect(query.isAvailable).toEqual(false);
});

it("#isEnabled", () => {
  expect(query.isEnabled).toEqual(undefined);
  store.update({ isEnabled: true });
  expect(query.isEnabled).toEqual(true);
  store.update({ isEnabled: false });
  expect(query.isEnabled).toEqual(false);
});

it("#isEnabled$", () => {
  const VALUES = {
    t: true,
    f: false,
    u: undefined
  };
  const updateAddress$ = runEffect("t-f-f-t|", VALUES, isEnabled => store.update({ isEnabled }));
  const expected$ = cold("u-t-f-t|", VALUES);

  expect(withEffect(updateAddress$, query.isEnabled$)).toBeObservable(expected$);
});

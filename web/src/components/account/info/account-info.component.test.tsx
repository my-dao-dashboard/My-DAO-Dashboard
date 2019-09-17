import React from "react";
import TestRenderer from "react-test-renderer";
import AccountInfoComponent from "./account-info.component";
import { Avatar } from "antd";

function render(address: string) {
  const testRenderer = TestRenderer.create(<AccountInfoComponent address={address} />);
  return testRenderer.root;
}

it("renders with provided address", () => {
  const address = "0x05a56e2d52c817161883f50c441c3228cfe54d9f";
  const instance = render(address);

  expect(instance).toBeDefined();
  expect(instance.props.address).toBe(address);
  expect(instance.findByType(Avatar)).toBeTruthy();
});

it("renders nothing with empty address", () => {
  const address = "";
  const instance = render(address);

  expect(instance.type).toBeTruthy();
  expect(instance.props.address).toBe(address);
  expect(instance.findAllByType(Avatar)).toEqual([]);
});

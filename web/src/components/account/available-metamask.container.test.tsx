import React  from "react";
import { AvailableMetamaskContainer } from "./available-metamask.container";
import { MetamaskService } from "../../services/metamask/metamask.service";
import { MetamaskContext } from "../../contexts/metamask.context";
import TestRenderer from "react-test-renderer";
import { NoMetamaskView } from "./no-metamask.view";
import { EnableMetamaskContainer } from "./enable-metamask.container";

function render(metamaskService: MetamaskService) {
  const testRenderer = TestRenderer.create(
    <MetamaskContext.Provider value={metamaskService}>
      <AvailableMetamaskContainer />
    </MetamaskContext.Provider>
  );
  return testRenderer.root;
}

it("metamask not available", () => {
  const metamaskService = new MetamaskService({});
  const instance = render(metamaskService);
  expect(instance.findByType(NoMetamaskView)).toBeTruthy();
  expect(instance.findAllByType(EnableMetamaskContainer)).toEqual([]);
});

it("metamask available", () => {
  const window = {
    ethereum: {}
  };
  const metamaskService = new MetamaskService(window);
  const instance = render(metamaskService);
  expect(instance.findAllByType(NoMetamaskView)).toEqual([]);
  expect(instance.findByType(EnableMetamaskContainer)).toBeTruthy();
});

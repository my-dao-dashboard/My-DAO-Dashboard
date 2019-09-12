import React from "react";
import TestRenderer from "react-test-renderer";
import { MetamaskService } from "../../services/metamask/metamask.service";
import { MetamaskContext } from "../../contexts/metamask.context";
import { LoginComponent } from "./login.component";
import { EnableMetamaskContainer } from "./enable-metamask.container";
import { BrowserRouter } from "react-router-dom";
import { BehaviorSubject, of } from "rxjs";

it("metamask disabled", () => {
  const metamaskService = new MetamaskService({});
  const testRenderer = TestRenderer.create(
    <MetamaskContext.Provider value={metamaskService}>
      <BrowserRouter>
        <EnableMetamaskContainer>
          <p className={"child"}>Child</p>
        </EnableMetamaskContainer>
      </BrowserRouter>
    </MetamaskContext.Provider>
  );
  const instance = testRenderer.root;
  expect(metamaskService.query.isEnabled).toBeFalsy();
  expect(instance.findByType(LoginComponent)).toBeTruthy();
});

it("metamask enabled", () => {
  const metamaskService = new MetamaskService({
    ethereum: {
      enable: () => {},
      selectedAddress: "foo"
    }
  });
  const testRenderer = TestRenderer.create(
    <MetamaskContext.Provider value={metamaskService}>
      <BrowserRouter>
        <EnableMetamaskContainer>
          <p className={"child"}>Child</p>
        </EnableMetamaskContainer>
      </BrowserRouter>
    </MetamaskContext.Provider>
  );
  const instance = testRenderer.root;
  expect(metamaskService.query.isEnabled).toBeTruthy();
  expect(instance.findAllByType(LoginComponent)).toEqual([]);
  expect(instance.findByType("p").findAllByProps({ className: "child" })).toBeTruthy();
});

it("metamask enabled workflow", () => {
  const enabledSubject = new BehaviorSubject<boolean>(false);
  let metamaskService = ({
    query: {
      isEnabled: false,
      isEnabled$: enabledSubject.asObservable()
    }
  } as unknown) as MetamaskService;
  const element = (
    <MetamaskContext.Provider value={metamaskService}>
      <BrowserRouter>
        <EnableMetamaskContainer>
          <p className={"child"}>Child</p>
        </EnableMetamaskContainer>
      </BrowserRouter>
    </MetamaskContext.Provider>
  );
  const testRenderer = TestRenderer.create(element);

  const instance = testRenderer.root;
  expect(metamaskService.query.isEnabled).toBeFalsy();
  expect(instance.findAllByType(LoginComponent)).toBeTruthy();
  expect(instance.findByType("p").findAllByProps({ className: "child" })).toEqual([]);

  enabledSubject.next(true);
  testRenderer.update(element);

  expect(instance.findAllByType(LoginComponent)).toEqual([]);
  expect(instance.findByType("p").findAllByProps({ className: "child" })).toBeTruthy()
});

import React from "react";
import ReactDOM from "react-dom";
import { MetamaskService } from "../../services/metamask/metamask.service";
import { MetamaskContext } from "../../contexts/metamask.context";
import { EnableMetamaskContainer } from "./enable-metamask.container";
import { BehaviorSubject } from "rxjs";
import { unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";
import { idSelector } from "../../util/testing";

let container: HTMLDivElement;

beforeEach(() => {
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  unmountComponentAtNode(container);
  container.remove();
});

function renderComponent(metamaskService: MetamaskService) {
  act(() => {
    ReactDOM.render(
      <MetamaskContext.Provider value={metamaskService}>
        <EnableMetamaskContainer>
          <p className={"child"}>Child</p>
        </EnableMetamaskContainer>
      </MetamaskContext.Provider>,
      container
    );
  });
}

it("metamask disabled", () => {
  const metamaskService = new MetamaskService({});
  expect(metamaskService.query.isEnabled).toBeFalsy();
  renderComponent(metamaskService);
  expect(container.querySelector(idSelector('login-component'))).toBeTruthy();
});

it("metamask enabled", () => {
  const metamaskService = new MetamaskService({
    ethereum: {
      enable: () => {},
      selectedAddress: "foo"
    }
  });
  renderComponent(metamaskService);
  expect(metamaskService.query.isEnabled).toBeTruthy();
  expect(container.querySelector(idSelector('login-component'))).toBeFalsy();
  expect(container.querySelector("p.child")).toBeTruthy();
});

it("metamask enabled workflow", () => {
  const enabledSubject = new BehaviorSubject<boolean>(false);
  let metamaskService = ({
    query: {
      isEnabled: false,
      isEnabled$: enabledSubject.asObservable()
    }
  } as unknown) as MetamaskService;

  renderComponent(metamaskService);
  expect(container.querySelector(idSelector('login-component'))).toBeTruthy();
  expect(container.querySelector("p.child")).toBeFalsy();

  act(() => {
    enabledSubject.next(true);
  });

  expect(container.querySelector(idSelector('login-component'))).toBeFalsy();
  expect(container.querySelector("p.child")).toBeTruthy();
});

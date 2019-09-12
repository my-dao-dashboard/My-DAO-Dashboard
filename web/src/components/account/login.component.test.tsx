import ReactDOM, { unmountComponentAtNode } from "react-dom";
import { MetamaskService } from "../../services/metamask/metamask.service";
import { act } from "react-dom/test-utils";
import { MetamaskContext } from "../../contexts/metamask.context";
import React from "react";
import { LoginComponent } from "./login.component";
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

function renderComponent(metamaskService: MetamaskService, onError: (m: string) => void = () => {}) {
  act(() => {
    ReactDOM.render(
      <MetamaskContext.Provider value={metamaskService}>
        <LoginComponent onError={onError} />
      </MetamaskContext.Provider>,
      container
    );
  });
}

it("render", () => {
  const metamaskService = new MetamaskService({});
  renderComponent(metamaskService);
  expect(container.querySelector(idSelector("login-component"))).toBeTruthy();
  expect(container.querySelector(idSelector("login-component-welcome"))).toBeTruthy();
});

it("click", () => {
  const window = {
    ethereum: {
      enable: jest.fn(),
      selectedAddress: undefined
    }
  };
  const metamaskService = new MetamaskService(window);
  renderComponent(metamaskService);
  expect(container.querySelector<HTMLButtonElement>(idSelector("connect-button"))!.disabled).toBeFalsy();
  act(() => {
    const button = container.querySelector(idSelector("connect-button"))!;
    button.dispatchEvent(new MouseEvent("click", { bubbles: true }));
  });

  expect(container.querySelector<HTMLButtonElement>(idSelector("connect-button"))!.disabled).toBeTruthy();
  expect(window.ethereum.enable).toBeCalled();
});

it("failure to enable", async () => {
  const window = {
    ethereum: {
      enable: jest.fn(async () => {
        throw new Error('NOT_ENABLED')
      }),
      selectedAddress: undefined
    }
  };
  const metamaskService = new MetamaskService(window);
  const onError = jest.fn();
  renderComponent(metamaskService, onError);
  expect(container.querySelector<HTMLButtonElement>(idSelector("connect-button"))!.disabled).toBeFalsy();
  await act(async () => {
    const button = container.querySelector(idSelector("connect-button"))!;
    button.dispatchEvent(new MouseEvent("click", { bubbles: true }));
  });
  expect(container.querySelector<HTMLButtonElement>(idSelector("connect-button"))!.disabled).toBeFalsy();
  expect(window.ethereum.enable).toBeCalled();
  expect(onError).toBeCalledWith('NOT_ENABLED');
});

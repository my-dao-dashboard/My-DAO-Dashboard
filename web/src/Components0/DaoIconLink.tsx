import { Icon } from "antd";
import React, { Component } from "react";

interface IProps {
  type: string;
  address: string;
}

export default class DaoIconLink extends Component<IProps> {
  public render() {
    switch (this.props.type) {
        case "ARAGON":
          return (
                <a href={`https://mainnet.aragon.org/#/${this.props.address}`} target="_blank" rel="noopener noreferrer">
                    <small><Icon type="select" /></small>
                </a>
            );
        case "MOLOCH":
          return (
                <a href={`https://molochdao.com/proposals/`} target="_blank" rel="noopener noreferrer">
                <small><Icon type="select" /></small>
            </a>
          );
        default:
            return (
              <a href={`https://etherscan.io/address/${this.props.address}`} target="_blank" rel="noopener noreferrer">
                  <small><Icon type="select" /></small>
              </a>
          );
    }
  }
}

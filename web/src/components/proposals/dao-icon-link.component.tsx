import { Icon } from "antd";
import React, { Component } from "react";

interface IProps {
  type: string;
  dao: string;
  vote?: string;
}

export default class DaoIconLinkComponent extends Component<IProps> {
  public render() {
    switch (this.props.type) {
      case "ARAGON":
        return (
          <a href={`https://mainnet.aragon.org/#/${this.props.dao}`} target="_blank" rel="noopener noreferrer">
            <small>
              <Icon type="select" />
            </small>
          </a>
        );
      case "MOLOCH":
        return (
          <a href={`https://molochdao.com/proposals/${this.props.vote}`} target="_blank" rel="noopener noreferrer">
            <small>
              <Icon type="select" />
            </small>
          </a>
        );
      case "DAOSTACK":
        return (
          <a href={`https://alchemy.daostack.io/dao/${this.props.dao}/proposal/${this.props.vote}`} target="_blank" rel="noopener noreferrer">
            <small>
              <Icon type="select" />
            </small>
          </a>
        );
      default:
        return (
          <a href={`https://etherscan.io/address/${this.props.dao}`} target="_blank" rel="noopener noreferrer">
            <small>
              <Icon type="select" />
            </small>
          </a>
        );
    }
  }
}

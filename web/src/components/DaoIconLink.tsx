import { Icon } from "antd";
import React, { Component } from "react";

interface IProps {
  type: string;
  dao: string;
  vote?: string;
}

export default class DaoIconLink extends Component<IProps> {
  private getDaoLink(): string {
    switch (this.props.type) {
      case "ARAGON":
        return `https://mainnet.aragon.org/#/${this.props.dao}`;
      case "MOLOCH":
        return `https://molochdao.com/proposals/${this.props.vote}`;
      case "DAOSTACK":
        return `https://alchemy.daostack.io/dao/${this.props.dao}/proposal/${this.props.vote}`;
      default:
        return `https://etherscan.io/address/${this.props.dao}`;
    }
  }
  public render() {
    return (
      <a href={this.getDaoLink()} target="_blank" rel="noopener noreferrer">
        <Icon type="select" />
      </a>
    );
  }
}

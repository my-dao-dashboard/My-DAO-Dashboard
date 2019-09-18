import { Icon } from "antd";
import React, { Component } from "react";
import { DAO_ARAGON_LINK, ETHERSCAN_LINK, DAO_DAOSTACK_LINK, DAO_MOLOCH_LINK } from "../../constants";

interface IProps {
  type: string;
  dao: string;
  vote?: string;
}

export default class DaoIconLinkComponent extends Component<IProps> {
  private getDaoLink(): string {
    switch (this.props.type) {
      case "ARAGON":
        return DAO_ARAGON_LINK + this.props.dao;
      case "MOLOCH":
        return `${DAO_MOLOCH_LINK}proposals/${this.props.vote}`;
      case "DAOSTACK":
        return `${DAO_DAOSTACK_LINK}${this.props.dao}/proposal/${this.props.vote}`;
      default:
        return ETHERSCAN_LINK + this.props.dao;
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

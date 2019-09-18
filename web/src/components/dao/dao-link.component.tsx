import React, { Component } from "react";
import { DaoType } from "../../model/dao-type";
import { DAO_ARAGON_LINK, DAO_DAOSTACK_LINK, DAO_MOLOCH_LINK } from "../../constants";

interface IProps {
  type: DaoType;
  address: string;
}

export default class DaoLinkComponent extends Component<IProps> {
  public handleAragonClick(e: any) {
    e.preventDefault();
    this.openLink(DAO_ARAGON_LINK + this.props.address);
  }

  public handleMolochClick(e: any) {
    e.preventDefault();
    this.openLink(DAO_MOLOCH_LINK);
  }

  public handleDaostackClick(e: any) {
    e.preventDefault();
    this.openLink(DAO_DAOSTACK_LINK + this.props.address);
  }

  public openLink(url: string) {
    window.open(url, "_blank", "noopener noreferrer");
  }

  public render() {
    switch (this.props.type) {
      case DaoType.ARAGON:
        return (
          <span onClick={this.handleAragonClick.bind(this)} className="link">
            <small style={{ color: "light blue" }}>{this.props.address}</small>
          </span>
        );
      case DaoType.MOLOCH:
        return (
          <span onClick={this.handleMolochClick.bind(this)} className="link">
            <small style={{ color: "light blue" }}>{this.props.address}</small>
          </span>
        );
      case DaoType.DAOSTACK:
        return (
          <span onClick={this.handleDaostackClick.bind(this)} className="link">
            <small style={{ color: "light blue" }}>{this.props.address}</small>
          </span>
        );
      default:
        return <small>{this.props.address}</small>;
    }
  }
}

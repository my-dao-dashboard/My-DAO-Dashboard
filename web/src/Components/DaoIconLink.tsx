import React, { Component } from "react";
import { Icon } from "antd";

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
        default:
            return <small>{this.props.address}</small>;
    }
  }
}

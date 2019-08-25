import React, { Component } from "react";

interface IProps {
  type: string;
  address: string;
}

export default class DaoLink extends Component<IProps> {
  public render() {
    switch (this.props.type) {
        case "ARAGON":
          return (
                <a href={`https://mainnet.aragon.org/#/${this.props.address}`} target="_blank" rel="noopener noreferrer">
                    <small>{this.props.address}</small>
                </a>
            );
        default:
            return <small>{this.props.address}</small>;
    }
  }
}

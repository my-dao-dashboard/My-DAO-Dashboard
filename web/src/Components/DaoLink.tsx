import React, {Component} from "react";
import {DaoKind} from "../backbone/State";

interface IProps {
  type: DaoKind;
  address: string;
}

export default class DaoLink extends Component<IProps> {
    public handleAragonClick(e: any) {
        e.preventDefault();
        this.openLink(`https://mainnet.aragon.org/#/${this.props.address}`)
    }

    public handleMolochClick(e: any) {
        e.preventDefault();
        this.openLink(`https://etherscan.io/address/${this.props.address}`)
    }

    public openLink(url: string) {
        window.open(url, '_blank', 'noopener noreferrer')
    }

  public render() {
    switch (this.props.type) {
        case DaoKind.ARAGON:
          return (
                <span onClick={this.handleAragonClick.bind(this)}>
                    <small style={{color: 'light blue'}}>{this.props.address}</small>
                </span>
            );
        case DaoKind.MOLOCH:
            return (
                <span onClick={this.handleMolochClick.bind(this)}>
                    <small style={{color: 'light blue'}}>{this.props.address}</small>
                </span>
            );
        default:
            return <small>{this.props.address}</small>;
    }
  }
}

import React, { Component } from "react";
import { Tooltip, Avatar, Menu } from "antd";
import makeBlockie from "ethereum-blockies-base64";

interface IProps {
  address: string;
}

export default class AccountInfoComponent extends Component<IProps> {
  public render() {
    if (this.props.address) {
      const first = this.props.address.substring(0, 5);
      const last = this.props.address.substring(this.props.address.length - 3, this.props.address.length);
      const shortAddress = `${first}...${last}`;

      return (
        <Tooltip title={this.props.address} placement="left">
          <Avatar shape="square" size="small" src={makeBlockie(this.props.address)} />
          &nbsp; &nbsp;
          <small>{shortAddress}</small>
        </Tooltip>
      );
    }

    return <></>;
  }
}

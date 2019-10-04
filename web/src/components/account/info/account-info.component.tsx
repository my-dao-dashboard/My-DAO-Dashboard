import React, { Component } from "react";
import { Avatar } from "antd";
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
        <div className="accountinfo">
          <p>{shortAddress}</p>
          <Avatar shape="circle" size={32} src={makeBlockie(this.props.address)}/>
        </div>
        // <Tooltip title={this.props.address}>
        //   <small>{shortAddress}</small>
        //   <Avatar shape="circle" size="small" src={makeBlockie(this.props.address)} />
        // </Tooltip>
      );
    }

    return <></>;
  }
}

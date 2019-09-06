import { Tag } from "antd";
import React, { Component } from "react";

interface IProps {
  type: string;
}

export default class DaoTagView extends Component<IProps> {
  public render() {
    return (
      <>
        <Tag color={this.color()}>
          <small>{this.props.type}</small>
        </Tag>
      </>
    );
  }

  private color = () => {
    switch (this.props.type) {
      case "ARAGON":
        return "cyan";
      case "MOLOCH":
        return "red";
      case "DAOSTACK":
        return "geekblue";
      default:
        return "blue";
    }
  };
}

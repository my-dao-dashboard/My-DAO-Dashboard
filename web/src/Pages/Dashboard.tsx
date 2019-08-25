import React, { Component } from "react";
import DaoListComponent from "../Components/DaoListComponent/DaoListComponent";
import ProposalListComponent from "../Components/ProposalListComponent/ProposalListComponent";

export default class Dashboard extends Component {
  public render() {
    return <>
        <DaoListComponent />
        <ProposalListComponent />
    </>
  }
}

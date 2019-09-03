import React, { Component } from "react";
import DaoListComponent from "../Components0/DaoListComponent/DaoListComponent";
import OverallProposalListComponent from "../Components0/OverallProposalListComponent";

export default class Dashboard extends Component {
  public render() {
    return <>
        <DaoListComponent />
        <OverallProposalListComponent />
    </>
  }
}

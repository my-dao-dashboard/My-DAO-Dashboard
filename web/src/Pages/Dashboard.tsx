import React, { Component } from "react";
import DaoListComponent from "../Components/DaoListComponent/DaoListComponent";
import OverallProposalListComponent from "../Components/OverallProposalListComponent";

export default class Dashboard extends Component {
  public render() {
    return <>
        <DaoListComponent />
        <OverallProposalListComponent />
    </>
  }
}

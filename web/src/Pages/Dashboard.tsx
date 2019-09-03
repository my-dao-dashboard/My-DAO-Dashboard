import React, { Component } from "react";
import DaoListComponent from "../components/DaoListComponent/DaoListComponent";
import OverallProposalListComponent from "../components/OverallProposalListComponent";

export default class Dashboard extends Component {
  public render() {
    return <>
        <DaoListComponent />
        <OverallProposalListComponent />
    </>
  }
}

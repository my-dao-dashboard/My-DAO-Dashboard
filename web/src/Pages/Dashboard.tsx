import React, { Component } from "react";
import DaoListComponent from "../Components/DaoListComponent/DaoListComponent";
import DaoListLoader from "../Components/DaoListComponent/DaoListLoader";
import ProposalListComponent from "../Components/ProposalListComponent/ProposalListComponent";

export default class Dashboard extends Component {
  public render() {
    return <DaoListLoader>
        <DaoListComponent />
        <ProposalListComponent />
    </DaoListLoader>
  }
}

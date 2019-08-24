import React, { Component } from "react";
import DaoListComponent from "../Components/DaoListComponent/DaoListComponent";
import DaoListLoader from "../Components/DaoListComponent/DaoListLoader";

export default class Dashboard extends Component {
  public render() {
    return (
      <>
        <DaoListLoader>
          <DaoListComponent />
        </DaoListLoader>
      </>
    );
  }
}

import React, { Component } from "react";
import DaoListComponent from "../DaoListComponent/DaoListComponent";
import DaoListLoader from "../DaoListComponent/DaoListLoader";

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

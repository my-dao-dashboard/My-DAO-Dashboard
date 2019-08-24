import React, { Component } from "react";
import DaoOverview from "../Components/DaoOverviewComponent/DaoOverview";
import DaoOverviewLoader from "../Components/DaoOverviewComponent/DaoOverviewLoader";

export default class DAO extends Component {
  public render() {
    return (
      <>
        <div>
          <DaoOverviewLoader>
            <DaoOverview />
          </DaoOverviewLoader>
        </div>
      </>
    );
  }
}

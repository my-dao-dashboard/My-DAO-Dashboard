import React, { Component } from "react";
import { RouteComponentProps } from "react-router";
import DaoOverview from "../Components/DaoOverviewComponent/DaoOverview";
import DaoOverviewLoader from "../Components/DaoOverviewComponent/DaoOverviewLoader";

interface IProps {
	address: string;
}

export default class DAO extends Component<RouteComponentProps<IProps>> {
  public render() {
    return (
      <>
        <div>
          <DaoOverviewLoader address={this.props.match.params.address}>
            <DaoOverview />
          </DaoOverviewLoader>
        </div>
      </>
    );
  }
}

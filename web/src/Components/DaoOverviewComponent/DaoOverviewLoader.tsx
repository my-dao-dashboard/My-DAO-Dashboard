import React from "react";
import { connect } from "react-redux";
import { ThunkDispatch } from "redux-thunk";
import * as daos from "../../backbone/daos";
import { State } from "../../backbone/State";
import Loader from "../Layout/Loader/Loader";

interface IProps {
  address: string;
}

interface StateProps {
  address: string;
  account: string;
  isLoading: boolean;
}

interface DispatchProps {
  getDao: (account: string, daoAddress: string) => void;
}

export class DaoOverviewLoader extends React.Component<StateProps & DispatchProps> {
  public componentDidMount(): void {
    this.props.getDao(this.props.account, this.props.address);
  }

  public render() {
    if (this.props.isLoading) {
      return <Loader />;
    } else {
      return this.props.children;
    }
  }
}

function stateToProps(state: State, props: IProps): StateProps {
  return {
    address: props.address!,
    account: state.account.address!,
    isLoading: state.daos.dao === undefined
  };
}

function dispatchToProps(dispatch: ThunkDispatch<any, any, any>): DispatchProps {
  return {
    getDao: (account: string, daoAddress: string) => {
      return dispatch(daos.getDao.action([account, daoAddress]));
    }
  };
}

export default connect(
  stateToProps,
  dispatchToProps
)(DaoOverviewLoader);

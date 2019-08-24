import React from "react";
import { connect } from "react-redux";
import { ThunkDispatch } from "redux-thunk";
import * as daos from "../../backbone/daos";
import { State } from "../../backbone/State";
import Loader from "../Layout/Loader/Loader";

interface StateProps {
  account: string;
  isLoading: boolean;
}

interface DispatchProps {
  getDao: (account: string, daoAddress: string) => void;
}

export class DaoOverviewLoader extends React.Component<StateProps & DispatchProps> {
  componentDidMount(): void {
    this.props.getDao(this.props.account, "0xb788256177F8398babdDb1118bc4aa0557Ed8c65");
  }

  render() {
    if (this.props.isLoading) {
      return <Loader />;
    } else {
      return this.props.children;
    }
  }
}

function stateToProps(state: State): StateProps {
  return {
    account: state.account.address!,
    isLoading: state.daos.dao === undefined
  };
}

function dispatchToProps(dispatch: ThunkDispatch<any, any, any>): DispatchProps {
  return {
    getDao: (account: string, daoAddress: string) => {
      return dispatch(daos.getDao.action(account));
    }
  };
}

export default connect(
  stateToProps,
  dispatchToProps
)(DaoOverviewLoader);

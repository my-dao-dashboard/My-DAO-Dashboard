import React from "react";
import { connect } from "react-redux";
import { ThunkDispatch } from "redux-thunk";
import * as daos from "../../backbone/daos";
import { State } from "../../backbone/State";
import Loader from "../Layout/Loader/Loader";

interface StateProps {
  isLoading: boolean;
}

interface DispatchProps {
  getDao: (address: string) => void;
}

export class DaoOverviewLoader extends React.Component<StateProps & DispatchProps> {
  componentDidMount(): void {
    this.props.getDao("0xb788256177F8398babdDb1118bc4aa0557Ed8c65");
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
  console.log("udpated state", state);
  return {
    isLoading: state.daos.dao === undefined
  };
}

function dispatchToProps(dispatch: ThunkDispatch<any, any, any>): DispatchProps {
  return {
    getDao: (address: string) => {
      return dispatch(daos.getDao.action(address));
    }
  };
}

export default connect(
  stateToProps,
  dispatchToProps
)(DaoOverviewLoader);

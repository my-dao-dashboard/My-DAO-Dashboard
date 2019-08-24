import React from "react";
import { connect } from "react-redux";
import { ThunkDispatch } from "redux-thunk";
import * as daos from "../../backbone/daos";
import { State } from "../../backbone/State";
import Loader from "../Layout/Loader/Loader";

interface StateProps {
  isLoading: boolean;
  account: string;
}

interface DispatchProps {
  getDaos: (address: string) => void;
}

export class DaoListLoader extends React.Component<StateProps & DispatchProps> {
  componentDidMount(): void {
    this.props.getDaos(this.props.account);
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
    isLoading: state.daos.daos === undefined
  };
}

function dispatchToProps(dispatch: ThunkDispatch<any, any, any>): DispatchProps {
  return {
    getDaos: (address: string) => {
      return dispatch(daos.getDaos.action(address));
    }
  };
}

export default connect(
  stateToProps,
  dispatchToProps
)(DaoListLoader);

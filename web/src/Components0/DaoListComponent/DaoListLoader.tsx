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
  getDaos: (account: string) => void;
}

export class DaoListLoader extends React.Component<StateProps & DispatchProps> {
  public async componentDidMount(): Promise<void> {
    this.props.getDaos(this.props.account);
  }

  public render() {
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

export function uniq<A>(array: A[]): A[] {
  return array.filter((v, i) => {
    return array.indexOf(v) === i;
  });
}


function dispatchToProps(dispatch: ThunkDispatch<any, any, any>): DispatchProps {
  return {
    getDaos: async (account: string) => {
      return dispatch(daos.getDaos.action(account));
    }
  };
}

export default connect(
  stateToProps,
  dispatchToProps
)(DaoListLoader);

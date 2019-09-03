import React from "react";
import { connect } from "react-redux";
import { ThunkDispatch } from "redux-thunk";
import * as account from "../../backbone/account";
import { State } from "../../backbone/State";

interface StateProps {
  account: string | undefined;
}

interface DispatchProps {
  getAddress: () => void;
}

export class AccountComponent extends React.Component<DispatchProps & StateProps> {
  public componentDidMount(): void {
    this.props.getAddress();
  }

  public render() {
    if (this.props.account) {
      return this.props.children;
    } else {
      return <p>Connecting to web3.. Make sure you use a web3-enabled browsers and unlock your account.</p>;
    }
  }
}

function stateToProps(state: State): StateProps {
  return {
    account: state.account.address
  };
}

function dispatchToProps(dispatch: ThunkDispatch<any, any, any>): DispatchProps {
  return {
    getAddress: () => {
      return dispatch(account.getAddress.action());
    }
  };
}

export default connect(
  stateToProps,
  dispatchToProps
)(AccountComponent);

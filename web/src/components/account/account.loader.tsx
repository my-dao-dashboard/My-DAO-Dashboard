import React from "react";
import { connect } from "react-redux";
import { State } from "../../redux/redux";
import LoginComponent from "./login.component";

interface Props {
  account: string;
}

function mapStateToProps(state: State): Props {
  return {
    account: state.account.address
  };
}

export class AccountLoader extends React.Component<Props> {
  render() {
    if (this.props.account) {
      return this.props.children;
    } else {
      return <LoginComponent />;
    }
  }
}

export default connect(mapStateToProps)(AccountLoader);

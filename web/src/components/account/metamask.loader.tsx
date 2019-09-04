import React from "react";
import { connect } from "react-redux";
import { State } from "../../redux/redux";
import { NotMetamaskComponent } from "./not-metamask.component";
import AccountLoader from './account.loader';

interface Props {
  isMetamask: boolean;
  account: string;
}

function mapStateToProps(state: State): Props {
  return {
    isMetamask: state.account.isMetamask,
    account: state.account.address
  };
}

export class MetamaskLoader extends React.Component<Props> {
  render() {
    if (this.props.isMetamask) {
      return <AccountLoader>{this.props.children}</AccountLoader>
    } else {
      return <NotMetamaskComponent />;
    }
  }
}

export default connect(mapStateToProps)(MetamaskLoader);

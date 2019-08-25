import React from "react";
import { connect } from "react-redux";
import { ThunkDispatch } from "redux-thunk";
import * as daos from "../../backbone/daos";
import { State } from "../../backbone/State";
import Loader from "../Layout/Loader/Loader";
import {Provider} from "web3/providers";
import * as services from "../../backbone/services";

const Box = require('3box')

async function openBox(address: string, provider: Provider): Promise<any> {
  return new Promise<any>((resolve, reject) => {
    Box.openBox(address, provider).then((box: any) => {
      box.onSyncDone(() => {
        resolve(box)
      })
    }).catch(reject)
  })
}


interface StateProps {
  isLoading: boolean;
  account: string;
}

interface DispatchProps {
  getDaos: (account: string) => void;
}

export class DaoListLoader extends React.Component<StateProps & DispatchProps> {
  async componentDidMount(): Promise<void> {
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

export function uniq<A>(array: Array<A>): Array<A> {
  return array.filter((v, i) => {
    return array.indexOf(v) === i;
  });
}


function dispatchToProps(dispatch: ThunkDispatch<any, any, any>): DispatchProps {
  return {
    getDaos: async (account: string) => {
      const box = await openBox(account, services.accountService.web3().currentProvider)
      const space = await box.openSpace('my-dao-dashboard')
      const boxedAddresses = await space.private.get('watched-addresses') as string[] | undefined
      const accounts = boxedAddresses || []
      const realAccounts = uniq(accounts.concat(account).map(a => a.toLowerCase()))
      return dispatch(daos.getDaos.action(realAccounts));
    }
  };
}

export default connect(
  stateToProps,
  dispatchToProps
)(DaoListLoader);

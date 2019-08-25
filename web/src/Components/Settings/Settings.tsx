import React from "react";
import {AddressesForm} from "./AddressesForm";
import * as services from '../../backbone/services'
import {State} from "../../backbone/State";
import {connect} from "react-redux";
import {Provider} from "web3/providers";

const Box = require('3box')

const NAMESPACE = 'my-dao-dashboard'
const ADDRESS_KEY = 'watched-addresses'

async function openBox(address: string, provider: Provider): Promise<any> {
  return new Promise<any>((resolve, reject) => {
    Box.openBox(address, provider).then((box: any) => {
      box.onSyncDone(() => {
        resolve(box)
      })
    }).catch(reject)
  })
}

async function openSpace(box: any, name: string): Promise<any> {
  return box.openSpace(name)
}

interface Props {
  address: string
}

interface SettingsComponentState {
  boxedAddresses: [] | undefined
  space: any | undefined
}

export class Settings extends React.Component<Props, SettingsComponentState> {
  constructor(props: Props) {
    super(props)
    this.state = {
      space: undefined,
      boxedAddresses: undefined
    }
  }

  async componentDidMount() {
    const box = await openBox(this.props.address, services.accountService.web3().currentProvider)
    const space = await openSpace(box, NAMESPACE)
    const boxedAddresses = await space.private.get(ADDRESS_KEY)
    this.setState({
      space,
      boxedAddresses: boxedAddresses || []
    })
  }

   async handleSave (addresses: string[]) {
    await this.state.space.private.set(ADDRESS_KEY, addresses)
   }

  renderInternal () {
    if (!this.state.boxedAddresses) {
      return <p>Waiting for 3Box to sync...</p>
    } else {
      return <>
        <p>Watched addresses:</p>
        <AddressesForm onSave={this.handleSave.bind(this)} address={this.props.address} boxed={this.state.boxedAddresses}/>
      </>
    }
  }

  render() {
    return <>
      <h1>Settings</h1>
      {this.renderInternal()}
    </>
  }
}

function stateToProps(state: State): Props {
  return {
    address: state.account.address!
  };
}

export default connect(stateToProps)(Settings);


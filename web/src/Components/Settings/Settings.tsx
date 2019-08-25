import React from "react";
import {AddressesForm} from "./AddressesForm";
import * as services from '../../backbone/services'
import {State} from "../../backbone/State";
import {connect} from "react-redux";

const Box = require('3box')

interface Props {
  address: string
}

interface SettingsComponentState {
  isLoading: boolean
}

export class Settings extends React.Component<Props, SettingsComponentState> {
  private space: any

  constructor(props: Props) {
    super(props)
    this.state = {
      isLoading: true
    }
  }

  async componentDidMount() {
    const box = await Box.openBox(this.props.address, services.accountService.web3().currentProvider)
    box.onSyncDone(async () => {
      this.space = await box.openSpace('my-dao-dashboard', { onSyncDone: () => {
        this.setState({
          isLoading: false
        })
      }})
    })
  }

  handleSave (addresses: string[]) {
    console.log('got addresses', addresses)
  }

  renderInternal () {
    if (this.state.isLoading) {
      return <p>Waiting for 3Box to sync...</p>
    } else {
      return <>
        <p>Watched addresses:</p>
        <AddressesForm onSave={this.handleSave.bind(this)} address={this.props.address}/>
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


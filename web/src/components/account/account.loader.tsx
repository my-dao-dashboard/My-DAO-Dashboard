import React from 'react';
import { connect } from 'react-redux';
import { State } from '../../redux/redux';
import { NotMetamaskComponent } from './not-metamask.component';

interface Props {
  isMetamask: boolean
}

function mapStateToProps(state: State): Props {
  return {
    isMetamask: state.account.isMetamask
  }
}

export class AccountLoader extends React.Component<Props>{
  render () {
    if (this.props.isMetamask) {
      return this.props.children
    } else {
      return <NotMetamaskComponent/>
    }
  }
}

export default connect(mapStateToProps)(AccountLoader)

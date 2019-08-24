import React from "react";
import Web3 from "web3";
import { connect } from 'react-redux'
import {State} from "../backbone/State";
import {ThunkDispatch} from "redux-thunk";
import * as account from '../backbone/account'

export interface DaoListComponentState {
    isLoading: boolean
}

interface StateProps {
    isLoading: boolean
    account: string | undefined
}

interface DispatchProps {
    getAddress: () => void
}

export type Props = StateProps & DispatchProps

export class DaoListComponent extends React.Component<Props, DaoListComponentState> {

    constructor(props: Props) {
        super(props);
        this.state = {
            isLoading: true
        }
    }

    componentDidMount() {
        this.props.getAddress()
    }

    render() {
        if (this.props.isLoading) {
            return <>Loading...</>
        } else {
            return <p>{this.props.account}</p>
        }
    }
}

function stateToProps (state: State): StateProps {
    return {
        isLoading: state.account.isLoading,
        account: state.account.address
    }
}

function dispatchToProps (dispatch: ThunkDispatch<any, any, any>): DispatchProps {
    return {
        getAddress: () => {
            dispatch(account.getAddress.action())
        }
    }
}

function f() {

}

export default connect(stateToProps, dispatchToProps)(DaoListComponent)


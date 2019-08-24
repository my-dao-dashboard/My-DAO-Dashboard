import React from "react";
import { connect } from 'react-redux'
import {State} from "../backbone/State";
import {ThunkDispatch} from "redux-thunk";
import DaoListLoader from "./DaoListLoader";

export interface DaoListComponentState {
    isLoading: boolean
}

interface StateProps {
    account: string | undefined,
    isLoading: boolean,
}

interface DispatchProps {
    getDaos: (address: string) => void
}

export type Props = StateProps & DispatchProps

export class DaoListComponent extends React.Component<Props, DaoListComponentState> {

    constructor(props: Props) {
        super(props);
        this.state = {
            isLoading: true
        }
    }

    render() {
        return <DaoListLoader>
            <p>Loaded</p>
        </DaoListLoader>
    }
}

function stateToProps (state: State): StateProps {
    return {
        // isLoading: state.daos.isLoading,
        isLoading: true,
        account: state.account.address
    }
}

function dispatchToProps (dispatch: ThunkDispatch<any, any, any>): DispatchProps {
    return {
        getDaos: (address: string) => {
            console.log('getDaos')
        }
    }
}

export default connect(stateToProps, dispatchToProps)(DaoListComponent)


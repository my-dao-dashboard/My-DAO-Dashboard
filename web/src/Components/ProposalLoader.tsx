import React from "react";
import {DaoInstanceState, State} from "../backbone/State";
import {ThunkDispatch} from "redux-thunk";
import {connect} from "react-redux";

interface StateProps {
    account: string
    daos: DaoInstanceState[]
}

interface DispatchProps {
    // loadProposals: (daos: DaoInstanceState[]) => void
}

export class ProposalLoader extends React.Component {
    componentDidMount(): void {

    }

    render () {
        return this.props.children
    }
}


function stateToProps(state: State): StateProps {
    return {
        account: state.account.address!,
        daos: state.daos.daos!
    };
}

function dispatchToProps(dispatch: ThunkDispatch<any, any, any>): DispatchProps {
    return {
    }
}

export default connect(stateToProps, dispatchToProps)(ProposalLoader);
